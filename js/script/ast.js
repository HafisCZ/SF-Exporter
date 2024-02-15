const EXPRESSION_REGEXP = (function () {
    try {
        return new RegExp("(\\'[^\\']*\\'|\\\"[^\\\"]*\\\"|\\~\\d+|\\~|\\`[^\\`]*\\`|\\;|\\$\\$|\\$\\!|\\$|\\{|\\}|\\|\\||\\%|\\^|\\!\\=|\\!|\\&\\&|\\>\\=|\\<\\=|\\=\\=|\\(|\\)|\\+|\\-|\\/\\/|\\/|\\*|\\>|\\<|\\?|\\:|\\.+this|(?<!\\.)\\d+(?:.\\d+)?e\\d+|(?<!\\.)\\d+\\.\\d+|\\.|\\[|\\]|\\,)");
    } catch (e) {
        return new RegExp("(\\'[^\\']*\\'|\\\"[^\\\"]*\\\"|\\~\\d+|\\~|\\`[^\\`]*\\`|\\;|\\$\\$|\\$\\!|\\$|\\{|\\}|\\|\\||\\%|\\^|\\!\\=|\\!|\\&\\&|\\>\\=|\\<\\=|\\=\\=|\\(|\\)|\\+|\\-|\\/\\/|\\/|\\*|\\>|\\<|\\?|\\:|\\.+this|\\d+(?:.\\d+)?e\\d+|\\d+\\.\\d+|\\.|\\[|\\]|\\,)");
    }
})();

class ExpressionCache {
    static #cache = new Map();

    static reset () {
        this.#cache = new Map();
    }

    static set (scope, node, value) {
        if (!scope) {
            return;
        }

        const block = this.#cache.get(scope) || new Map();
        
        this.#cache.set(scope, block);

        block.set(String(node), value);
    }

    static get (scope, node) {
        const block = this.#cache.get(scope);
 
        if (typeof block !== 'undefined') {
            return block.get(String(node));
        } else {
            return undefined;
        }
    }

    static has (scope, node) {
        if (typeof scope === 'undefined') {
            return false;
        }

        const block = this.#cache.get(scope);
        if (block) {
            return block.has(String(node));
        } else {
            return false;
        }
    }
};

class ExpressionScope {
    clone () {
        let _copy = new ExpressionScope(this.env);
        _copy.self = [ ... this.self ];
        _copy.indirect = [ ... this.indirect ];
        _copy.current = this.current;
        _copy.compare = this.compare;
        _copy.header = this.header;

        return _copy;
    }

    empty () {
        return !(this.self.length + this.indirect.length);
    }

    alwaysEval () {
        return !this.empty() || !this.current || !this.compare;
    }

    constructor (env) {
        this.self = [];
        this.indirect = [];
        this.env = env || { theme: 'light', functions: Object.create(null), variables: Object.create(null), constants: Constants.DEFAULT, identifier: randomSHA1() };
    }

    addSelf (obj) {
        this.self.unshift(obj);
        return this;
    }

    with (current, compare) {
        this.current = current;
        this.compare = compare;

        if (current && compare) {
            this.token = `${this.env.identifier}.${current.LinkId}.${current.Timestamp}.${compare.Timestamp}`;
        }
        
        return this;
    }

    environment (env) {
        this.env = env;
        return this;
    }

    via (header) {
        this.header = header;
        return this;
    }

    add (obj) {
        if (obj != undefined) {
            this.indirect.unshift(obj);
        }
        return this;
    }

    getSelf (offset = 0) {
        return this.self[offset];
    }

    has (key) {
        if (this.self.length && typeof this.self[0] === 'object' && this.self[0] !== null && key in this.self[0]) {
            return true;
        }

        for (let i = 0; i < this.indirect.length; i++) {
            if (typeof this.indirect[i] === 'object' && this.indirect[i] !== null && key in this.indirect[i]) {
                return true;
            }
        }

        return false;
    }

    get (key) {
        if (this.self.length && typeof this.self[0] === 'object' && this.self[0] !== null && key in this.self[0]) {
            return this.self[0][key];
        }

        for (let i = 0; i < this.indirect.length; i++) {
            if (typeof this.indirect[i] === 'object' && this.indirect[0] !== null && key in this.indirect[i]) {
                return this.indirect[i][key];
            }
        }

        return undefined;
    }

    static get DEFAULT () {
        delete this.DEFAULT;

        return (this.DEFAULT = new this());
    }
}

class ExpressionRenderer {
    static render (highlighter, string, root = { constants: Constants.DEFAULT }, config = TABLE_EXPRESSION_CONFIG) {
        let tokens = string.replace(/\\\"/g, '\u2023').replace(/\\\'/g, '\u2043').split(EXPRESSION_REGEXP);
        let nextName = false;
        let bracketStack = [];

        // Go through all tokens
        for (let i = 0, token, prefix, suffix; i < tokens.length; i++) {
            token = tokens[i];
            if (/\S/.test(token)) {
                // Prepare token
                [, prefix, token, suffix] = token.match(/(\s*)(.*\S)(\s*)/);
                token = token.replace(/\u2023/g, '\\\"').replace(/\u2043/g, '\\\'');

                // Format token
                if (token == undefined) {
                    continue;
                }

                highlighter.normal(prefix);

                if (token.length > 1 && ['\'', '\"'].includes(token[0]) && ['\'', '\"'].includes(token[token.length - 1])) {
                    highlighter.comment(token);
                } else if (token.length > 1 && token[0] == '`' && token[token.length - 1] == '`') {
                    highlighter.string('`');
                    highlighter.join(token.slice(1, token.length - 1).split(/(\{\d+\})/g), (item) => /(\{\d+\})/.test(item) ? 'function' : 'string', '');
                    highlighter.string('`');
                } else if (config.has(token)) {
                    const data = config.get(token);

                    switch (data.type) {
                        case 'function': {
                            highlighter.function(token);
                            break;
                        }
                        case 'variable': {
                            highlighter.constant(token);
                            break;
                        }
                        case 'header': {
                            highlighter.header(token, data.meta);
                            break;
                        }
                        case 'accessor': {
                            highlighter.header(token, 'scoped');
                            break;
                        }
                        case 'enumeration': {
                            highlighter.enum(token);
                            break;
                        }
                    }
                } else if (Expression.TOKENS[token]) {
                    highlighter.operator(token);
                } else if (root.functions && root.functions[token]) {
                    highlighter.function(token);
                } else if (token === 'true' || token === 'false') {
                    highlighter.boolean(token, token === 'true');
                } else if (['undefined', 'null', 'loop_index', 'loop_array'].includes(token)) {
                    highlighter.constant(token);
                } else if (root.variables && root.variables[token]) {
                    if (root.variables[token].type === 'global') {
                        highlighter.variable(token, 'global');
                    } else if (root.variables[token].type === 'table') {
                        highlighter.variable(token, 'table');
                    } else {
                        highlighter.variable(token, 'local');
                    }
                } else if (/^(\.*)this$/.test(token)) {
                    highlighter.constant(token);
                } else if (root.constants.has(token)) {
                    highlighter.constant(token);
                } else if (/\~\d+/.test(token)) {
                    highlighter.enum(token);
                } else if (token == '$' || token == '$!' || token == '$$') {
                    highlighter.keyword(token);
                    nextName = true;
                } else if (Expression.TERMINATORS[token]) {
                    bracketStack.unshift(Expression.TERMINATORS[token]);

                    highlighter.normal(token);

                    nextName = false;
                } else if (Expression.TERMINATORS_INVERTED[token]) {
                    if (bracketStack[0] === token) {
                        bracketStack.shift();

                        highlighter.normal(token);
                    } else {
                        highlighter.error(token, true);
                    }
                } else if (nextName) {
                    nextName = false;
                    if (/[a-zA-Z0-9\-\_]+/.test(token)) {
                        highlighter.constant(token);
                    } else {
                        highlighter.normal(token);
                    }
                } else {
                    highlighter.normal(token);
                }

                highlighter.normal(suffix);
            } else {
                highlighter.normal(token);
            }
        }

        if (bracketStack.length > 0) {
            highlighter.floatError(' '.repeat(bracketStack.length));
        }
    }
}

class Expression {
    static create (string, settings = null, config = TABLE_EXPRESSION_CONFIG) {
        const expression = new Expression(string, settings, config);

        if (expression.isValid()) {
            return expression;
        } else {
            return null;
        }
    }

    constructor (string, settings = null, config = TABLE_EXPRESSION_CONFIG) {
        this.config = config;
        this.tokens = string.replace(/\\\"/g, '\u2023').replace(/\\\'/g, '\u2043').split(EXPRESSION_REGEXP).map(token => token.trim()).filter(token => token.length);
        this.root = false;

        if (this.tokens.length == 0) {
            this.empty = true;
        } else {
            let count = 0;
            for (let token of this.tokens) {
                if (token == '(') {
                    count++;
                } else if (token == ')') {
                    count--;
                }
            }

            if (count == 0) {
                this.rstr = SHA1(this.tokens.join(''));

                this.cacheable = true;
                this.subexpressions = [];

                // Get settings variable array
                let variables = (settings ? settings.variables : undefined) || Object.create(null);
                this.#parseEmbeddedVariables(variables);

                // Generate tree
                this.root = this.#getExpression();
                while (this.tokens[0] == ';') {
                    let sub_root = this.#postProcess(variables, this.root);
                    this.cacheable = this.cacheable && this.#checkCacheableNode(sub_root);
                    this.subexpressions.push(sub_root);

                    this.tokens.shift();
                    while (this.tokens[0] == ';') {
                        this.subexpressions.push(undefined);
                        this.tokens.shift();
                    }

                    this.root = this.#getExpression();
                }

                // Clean tree
                this.root = this.#postProcess(variables, this.root);

                // Check if tree is cacheable or not
                this.cacheable = this.cacheable && this.#checkCacheableNode(this.root);

                // Check if expression was resolved by post process and unwrap string if necessary
                if (typeof this.root === 'number') {
                    this.resolved = true;
                } else if (typeof this.root === 'object' && this.root.op === '__value') {
                    this.resolved = true;
                    this.root = this.root.args;
                }
            } else {
                this.empty = true;
            }
        }
    }

    // Outside eval function (always call this from outside of the Expression class)
    eval (scope = ExpressionScope.DEFAULT) {
        this.subexpressions_cache_indexes = [];
        this.subexpressions_cache = [];

        let value = undefined;
        if (this.resolved) {
            value = this.root;
        } else if (scope.alwaysEval() || !this.cacheable) {
            value = this.evalInternal(scope, this.root);
        } else if (ExpressionCache.has(scope.token, this.rstr)) {
            value = ExpressionCache.get(scope.token, this.rstr);
        } else {
            value = this.evalInternal(scope, this.root);
            ExpressionCache.set(scope.token, this.rstr, value);
        }

        return typeof value === 'number' && isNaN(value) ? undefined : value;
    }

    // Check if the expression is valid (no tokens left)
    isValid () {
        return this.tokens.length == 0 && !this.empty;
    }

    // Eval embedded variables
    #parseEmbeddedVariables (variables) {
        // All variables in the token string
        let embeddedVariables = [];

        // Current variable
        let brackets = 0;
        let index = null;
        let manualName = null;
        let type = 'table';

        // Iterate over all tokens
        for (let i = 0; i < this.tokens.length; i++) {
            // Current token
            let token = this.tokens[i];

            // Start new variable if current token matches ${
            if (token == '$') {
                if (this.tokens[i + 1] == '{') {
                    // Save current index and skip next bracket
                    index = i++;
                    brackets++;
                    type = 'table';
                } else if (this.tokens[i + 2] == '{') {
                    // Save current index and skip next bracket
                    index = i++;
                    brackets++;
                    manualName = this.tokens[i++];
                    type = 'table';
                }
            } else if (token == '$$') {
                if (this.tokens[i + 1] == '{') {
                    // Save current index and skip next bracket
                    index = i++;
                    brackets++;
                    type = 'global';
                } else if (this.tokens[i + 2] == '{') {
                    // Save current index and skip next bracket
                    index = i++;
                    brackets++;
                    manualName = this.tokens[i++];
                    type = 'global';
                }
            } else if (token == '$!') {
                if (this.tokens[i + 1] == '{') {
                    index = i++;
                    brackets++;
                    type = 'local';
                } else if (this.tokens[i + 2] == '{') {
                    // Save current index and skip next bracket
                    index = i++;
                    brackets++;
                    manualName = this.tokens[i++];
                    type = 'local';
                }
            } else if (index != null) {
                // If there is a variable
                if (token == '{') {
                    // Increment bracket counter
                    brackets++;
                } else if (token == '}') {
                    // Decrement bracket counter
                    brackets--;
                    if (brackets == 0) {
                        // Push new variable if brackets are 0
                        embeddedVariables.push({
                            start: index,
                            length: i - index + 1,
                            name: manualName,
                            type: type
                        });

                        // Reset temporary vars
                        index = null;
                        manualName = null;
                        brackets = 0;
                        type = 'table';
                    }
                }
            }
        }

        // Replace variables with placeholders and save expression
        for (let i = embeddedVariables.length - 1; i >= 0; i--) {
            let variable = embeddedVariables[i];

            // Get tokens and strip first 2 and last 1 token (control characters)
            let tokens = this.tokens.splice(variable.start, variable.length);
            tokens = tokens.slice(2 + (variable.name ? 1 : 0), tokens.length - 1);

            // Get expression from tokens
            let expression = new Expression(tokens.join(''));

            // Get placeholder name
            let name = variable.name;
            if (!name) {
                name = `__${expression.rstr}__${variable.table}`;
            }

            // Add variable name to the token list
            this.tokens.splice(variable.start, 0, isNaN(expression.root) ? name : expression.root);

            // Add variable to settings
            variables[name] = {
                ast: expression,
                type: variable.type
            };
        }
    }

    // Peek at next token
    #peek (i = 0) {
        return this.tokens[i];
    }

    // Get next token
    #get () {
        const v = this.tokens.shift();
        return isNaN(v) ? v : Number(v);
    }

    // Is token a string
    #isString (token) {
        if (token == undefined) {
            return false;
        } else {
            return (token[0] === '\'' && token[token.length - 1] === '\'') || (token[0] === '\"' && token[token.length - 1] === '\"');
        }
    }

    // Get next token as string
    #getString (cast = false) {
        const token = this.#get();

        if (this.#isString(token)) {
            return this.#wrapValue(token.slice(1, token.length - 1).replace(/\u2023/g, '\"').replace(/\u2043/g, '\''));
        } else {
            return cast ? this.#wrapValue(token) : token;
        }
    }

    #wrapValue (value) {
        return {
            op: '__value',
            args: value
        }
    }

    // Get next token as unary operator
    #getUnaryOperator () {
        return {
            op: Expression.#TOKEN_UNARY[this.#get()],
            args: [ this.#getVal() ]
        }
    }

    #getExpressionGroup (evalToken, evalBlank) {
        const args = [];

        const terminator = Expression.TERMINATORS[this.#get()];

        if (this.#peek() == terminator) {
            this.#get();
            return args;
        }

        do {
            const pk = this.#peek();
            if (pk === ',' || pk === terminator) {
                if (evalBlank) {
                    args.push(evalBlank(args.length));
                }
            } else {
                args.push(evalToken(args.length));
            }
        } while (this.#get() === ',');

        return args;
    }

    // Get global function
    #getFunction () {
        return {
            op: this.#get(),
            args: this.#getExpressionGroup(() => this.#getExpression(), () => this.#wrapValue(undefined))
        };
    }

    #getTemplate () {
        const val = this.#get();

        return {
            op: 'format',
            args: [
                this.#wrapValue(val.slice(1, val.length - 1)),
                ... this.#getExpressionGroup(() => this.#getExpression(), () => this.#wrapValue(undefined))
            ]
        };
    }

    // Get array
    #getArray () {
        return {
            op: '__array',
            args: this.#getExpressionGroup((key) => {
                return {
                    key,
                    val: this.#getExpression()
                };
            }, (key) => {
                return {
                    key,
                    val: this.#wrapValue(undefined)
                };
            })
        };
    }

    #getObjectItem () {
        const key = this.#peek(1) === ':' ? this.#getString() : this.#getExpression();
        this.#get();

        return {
            key: key,
            val: this.#getExpression()
        };
    }

    // Get array
    #getObject () {
        return {
            op: '__object',
            args: this.#getExpressionGroup(() => this.#getObjectItem(), false)
        };
    }

    // Get object access
    #getObjectAccess (node) {
        let name = undefined;

        if (this.#get() === '.') {
            name = this.#getString(true);
        } else {
            name = this.#getExpression();
            this.#get();
        }

        if (this.#peek() === '(') {
            this.#get();

            const args = [];

            if (this.#peek() === ')') {
                this.#get();
            } else {
                do {
                    args.push(this.#getExpression());
                } while (this.#get() === ',');
            }

            return {
                op: '__call',
                args: [ node, name, args ]
            }
        } else {
            return {
                op: '__at',
                args: [ node, name ]
            }
        }
    }

    #getVal () {
        let node = undefined;

        let token = this.#peek();
        let follow = this.#peek(1);

        if (token == undefined) {
            // Ignore undefined value
        } else if (token === '(') {
            // Get bracket
            this.#get();
            node = this.#getExpression();
            this.#get();
        } else if (this.#isString(token)) {
            // Get string
            node = this.#getString();
        } else if (/^\`.*\`$/.test(token) && follow === '(') {
            // Get template
            node = this.#getTemplate();
        } else if (Expression.#TOKEN_UNARY[token]) {
            // Get unary operator
            node = this.#getUnaryOperator();
        } else if (/[_a-zA-Z]\w*/.test(token) && follow === '(') {
            // Get function
            node = this.#getFunction();
        } else if (token === '[') {
            // Get array
            node = this.#getArray();
        } else if (token === '{') {
            // Get object
            node = this.#getObject();
        } else {
            // Get node
            node = this.#get();

            if (node === 'undefined') {
                node = this.#wrapValue(undefined);
            } else if (node === 'null') {
                node = this.#wrapValue(null);
            } else if (node === 'true') {
                node = this.#wrapValue(true);
            } else if (node === 'false') {
                node = this.#wrapValue(false);
            }
        }

        while (this.#peek() === '.' || this.#peek() === '[') {
            // Get object access
            node = this.#getObjectAccess(node);
        }

        return node;
    }

    #getHighPriority () {
        let node = this.#getVal();
        while (Expression.#TOKEN_HIGH_PRIORITY[this.#peek()]) {
            node = {
                op: Expression.#TOKEN_HIGH_PRIORITY[this.#get()],
                args: [node, this.#getVal()]
            }
        }

        return node;
    }

    #getMediumPriority () {
        let node = this.#getHighPriority();
        while (Expression.#TOKEN_MEDIUM_PRIORITY[this.#peek()]) {
            node = {
                op: Expression.#TOKEN_MEDIUM_PRIORITY[this.#get()],
                args: [node, this.#getHighPriority()]
            }
        }

        return node;
    }

    #getLowPriority () {
        let node = this.#getMediumPriority();
        while (Expression.#TOKEN_LOW_PRIORITY[this.#peek()]) {
            node = {
                op: Expression.#TOKEN_LOW_PRIORITY[this.#get()],
                args: [node, this.#getMediumPriority()]
            };
        }

        return node;
    }

    #getBool () {
        let node = this.#getLowPriority();
        while (Expression.#TOKEN_BOOL[this.#peek()]) {
            node = {
                op: Expression.#TOKEN_BOOL[this.#get()],
                args: [node, this.#getLowPriority()]
            }
        }

        return node;
    }

    #getBoolMerge () {
        let node = this.#getBool();
        while (Expression.#TOKEN_BOOL_MERGE[this.#peek()]) {
            node = {
                op: Expression.#TOKEN_BOOL_MERGE[this.#get()],
                args: [node, this.#getBool()]
            };
        }

        return node;
    }

    #getExpression () {
        let node = this.#getBoolMerge();
        if (this.#peek() == '?') {
            this.#get();

            // First argument
            const arg1 = this.#getExpression();
            this.#get();

            // Second argument
            const arg2 = this.#getExpression();

            // Create node
            node = {
                args: [node, arg1, arg2],
                op: '__condition'
            };
        }

        return node;
    }

    #checkCacheableNode (node) {
        if (typeof node === 'object') {
            if (this.config.has(node.op)) {
                const data = this.config.get(node.op);

                if (data.noCache) {
                    return false;
                }
            }

            if (node.args && node.op !== '__value') {
                for (const arg of node.args) {
                    if (!this.#checkCacheableNode(arg)) {
                        return false;
                    }
                }
            }
        } else if (typeof node === 'string') {
            if (this.config.has(node.op)) {
                const data = this.config.get(node.op);

                if (data.noCache) {
                    return false;
                }
            }
        }

        return true;
    }

    // Evaluate all simple nodes (simple string joining / math calculation with compile time results)
    #postProcess (variables, node) {
        if (typeof node === 'object') {
            if (node.op === '__value') return node;
            if (node.args) {
                for (let i = 0; i < node.args.length; i++) {
                    node.args[i] = this.#postProcess(variables, node.args[i]);
                }
            }

            if (this.config.has(node.op)) {
                const data = this.config.get(node.op);

                if (data.noCache) {
                    return node;
                } else if (data.type === 'function' && (data.meta === 'math' || data.meta === 'value') && node.args && node.args.filter(a => !isNaN(a) || (a != undefined && a.op === '__value')).length == node.args.length) {
                    const res = data.data(... node.args.map(a => a.op === '__value' ? a.args : a));
                    return typeof res === 'string' ? this.#wrapValue(res) : res;
                }
            }
        } else if (typeof node === 'string') {
            if (node in variables && !isNaN(variables[node].ast.root)) {
                return variables[node].ast.root;
            } else if (/\~\d+/.test(node)) {
                let index = parseInt(node.slice(1));
                if (index < this.subexpressions.length) {
                    let subnode = this.subexpressions[index];
                    if (typeof subnode === 'number' || (typeof subnode === 'object' && subnode.op === '__value')) {
                        return subnode;
                    } else if (typeof subnode === 'string' && subnode in variables && !isNaN(variables[subnode].ast.root)) {
                        return variables[subnode].ast.root;
                    }
                }
            }
        }

        return node;
    }

    // Evaluate a node into array, used for array functions
    evalToArray (scope, node) {
        const generated = this.evalInternal(scope, node);

        if (!generated || typeof(generated) != 'object') {
            return [];
        } else {
            return Array.isArray(generated) ? generated : Object.values(generated);
        }
    }

    evalMappedArray (obj, arg, loop_index, loop_array, mapper, segmented, scope) {
        if (mapper) {
            if (segmented) {
                return mapper.ast.eval(scope.clone().with(obj[0], obj[1]).addSelf(obj[0]).add(mapper.args.reduce((c, a, i) => { c[a] = obj[i]; return c; }, Object.create(null))).add({ loop_index, loop_array }));
            } else {
                return mapper.ast.eval(scope.clone().addSelf(obj).add(mapper.args.reduce((c, a) => { c[a] = obj; return c; }, Object.create(null))).add({ loop_index, loop_array }));
            }
        } else {
            if (segmented) {
                return this.evalInternal(scope.clone().with(obj[0], obj[1]).addSelf(obj[0]).add({ loop_index, loop_array }), arg);
            } else {
                return this.evalInternal(scope.clone().addSelf(obj).add({ loop_index, loop_array }), arg);
            }
        }
    }

    evalInternal (scope, node) {
        if (typeof node === 'object') {
            if (typeof node.op === 'string') {
                if (node.op === '__value') {
                    return node.args;
                } else if (scope.env.functions[node.op]) {
                    const mapper = scope.env.functions[node.op];
                    const scope2 = Object.create(null);
                    for (let i = 0; i < mapper.args.length; i++) {
                        scope2[mapper.args[i]] = this.evalInternal(scope, node.args[i]);
                    }

                    return mapper.ast.eval(scope.clone().add(scope2));
                } else if (this.config.has(node.op)) {
                    const data = this.config.get(node.op);

                    switch (data.type) {
                        case 'function': {
                            // Function
                            if (data.meta === 'scope') {
                                return data.data(this, scope, node);
                            } else if (data.meta === 'array') {
                                return data.data(
                                    this.evalToArray(scope, node.args[0]),
                                    ... node.args.slice(1).map(arg => this.evalInternal(scope, arg))
                                )
                            } else if (data.meta === 'math') {
                                const value = data.data(
                                    ... node.args.map(arg => this.evalInternal(scope, arg))
                                )

                                if (value == NaN) {
                                    return undefined;
                                } else {
                                    return value;
                                }
                            } else {
                                return data.data(
                                    ... node.args.map(arg => this.evalInternal(scope, arg))
                                );
                            }
                        }
                        case 'header': {
                            const obj = this.evalInternal(scope, node.args[0]);
                            return obj && typeof obj === 'object' ? data.data.expr(obj) : undefined;
                        }
                        case 'accessor': {
                            if (node.args.length == 1) {
                                const obj = this.evalInternal(scope, node.args[0]);
                                return obj && typeof obj === 'object' ? data.data(obj, scope.current) : undefined;
                            } else {
                                return undefined;
                            }
                        }
                    }
                } else {
                    // Return undefined
                    return undefined;
                }
            } else {
                // Return node in case something does not work :(
                return node;
            }
        } else if (typeof node === 'string') {
            let scopeValue = undefined;
            if (scopeValue = node.match(/(\.*)this/)) {
                return scope ? scope.getSelf(scopeValue[1].length) : undefined;
            } else if (/\~\d+/.test(node)) {
                // Return sub expressions
                let sub_index = parseInt(node.slice(1));
                if (sub_index < this.subexpressions.length) {
                    if (!this.subexpressions_cache_indexes.includes(sub_index)) {
                        this.subexpressions_cache_indexes.push(sub_index);
                        this.subexpressions_cache[sub_index] = this.evalInternal(scope, this.subexpressions[sub_index]);
                    }
                    return this.subexpressions_cache[sub_index];
                } else {
                    return undefined;
                }
            } else if (this.config.has(node)) {
                const data = this.config.get(node);

                switch (data.type) {
                    case 'variable': {
                        return data.data(scope);
                    }
                    case 'header': {
                        return scope.current ? data.data.expr(scope.current) : undefined;
                    }
                    case 'accessor': {
                        const self = scope.getSelf();
                        return self && typeof self === 'object' ? data.data(self, scope.current) : undefined;
                    }
                    case 'function': {
                        const self = scope.getSelf();
                        return data.meta === 'value' ? data.data(self) : undefined;
                    }
                    case 'enumeration': {
                        return data.data;
                    }
                }
            } else if (scope && scope.has(node)) {
                return scope.get(node);
            } else if (node in scope.env.variables) {
                let variable = scope.env.variables[node];
                if (typeof variable.value != 'undefined') {
                    return variable.value;
                } else if (ExpressionCache.has(scope.token, node)) {
                    return ExpressionCache.get(scope.token, node);
                } else {
                    ExpressionCache.set(scope.token, node, undefined);
                    let value = variable.ast.eval(new ExpressionScope(scope.env).with(scope.current, scope.compare).via(scope.header));
                    ExpressionCache.set(scope.token, node, value);
                    return value;
                }
            } else if (scope.env.constants.has(node)) {
                // Return constant
                return scope.env.constants.get(node);
            } else {
                return undefined;
            }
        } else {
            return node;
        }
    }

    static STRING_TERMINATORS = new Set([
        '\'', '"', '`'
    ])

    static TERMINATORS = {
        '(': ')',
        '[': ']',
        '{': '}'
    }

    static TERMINATORS_INVERTED = _invert(this.TERMINATORS);

    static TERMINATORS_ALL = Object.assign(
        {},
        this.TERMINATORS,
        this.TERMINATORS_INVERTED
    )

    static #TOKEN_UNARY = {
        '-': '__negate',
        '!': '__invert'
    }

    static #TOKEN_HIGH_PRIORITY = {
        '^': '__power'
    }

    static #TOKEN_MEDIUM_PRIORITY = {
        '*': '__multiply',
        '/': '__divide',
        '//': '__divide_integer',
        '%': '__modulo'
    }

    static #TOKEN_LOW_PRIORITY = {
        '+': '__add',
        '-': '__subtract'
    }

    static #TOKEN_BOOL = {
        '>': '__greater',
        '>=': '__greater_equal',
        '<': '__lower',
        '<=': '__lower_equal',
        '==': '__equal',
        '!=': '__not_equal',
        '~': '__like'
    }

    static #TOKEN_BOOL_MERGE = {
        '&&': '__and',
        '||': '__or'
    }

    static TOKENS = Object.assign(
        Object.create(null),
        this.#TOKEN_UNARY,
        this.#TOKEN_HIGH_PRIORITY,
        this.#TOKEN_MEDIUM_PRIORITY,
        this.#TOKEN_LOW_PRIORITY,
        this.#TOKEN_BOOL,
        this.#TOKEN_BOOL_MERGE
    )
}
