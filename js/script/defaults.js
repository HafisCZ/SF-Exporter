class DefaultScripts {
  static #internal = {
    player: {
      name: 'Players (dark)',
      author: 'mar21',
      content: '# Global settings\nstatistics on # Show statistics below the table\ndifference on # Show difference\n\ntheme dark\n\n# Create new category\ncategory General\n\n# Create new header\nheader Level\ndifference off # Don\'t show difference for Level\n\nheader Album\ntext @black\ncolor above or equal 90 @green # Color all values above 90 with green\ncolor above or equal 75 @orange\ncolor default @red # Color values in red by default\n\nheader Mount\ntext @black\ncolor equal 4 @green\ncolor above 0 @orange\ncolor default @red\n\nheader Awards\nhydra on # Show hydra\nstatistics off # Do not show statistics\n\ncategory\n\nheader Potions\ncolor equal 25 @green\ncolor above 0 @orange\ncolor default @red\n\ncategory Guild\n\nheader Treasure\nstatistics off\n\nheader Instructor\nstatistics off\n\nheader Pet\ntext @black\ncolor above or equal 335 @green\ncolor above or equal 235 @orange\ncolor default @red\n\nheader Knights\ntext @black\nmaximum on # Show fortress next to knights\ncolor above or equal 17 @green\ncolor above or equal 15 @orange\ncolor default @red\n\ncategory Fortress\n\nheader Fortress Honor'
    },
    player_light: {
      name: 'Players (light)',
      author: 'mar21',
      content: '# Global settings\nstatistics on # Show statistics below the table\ndifference on # Show difference\n\n# Create new category\ncategory General\n\n# Create new header\nheader Level\ndifference off # Don\'t show difference for Level\n\nheader Album\ncolor above or equal 90 @green # Color all values above 90 with green\ncolor above or equal 75 @orange\ncolor default @red # Color values in red by default\n\nheader Mount\ncolor equal 4 @green\ncolor above 0 @orange\ncolor default @red\n\nheader Awards\nhydra on # Show hydra\nstatistics off # Do not show statistics\n\ncategory\n\nheader Potions\ncolor equal 25 @green\ncolor above 0 @orange\ncolor default @red\n\ncategory Guild\n\nheader Treasure\nstatistics off\n\nheader Instructor\nstatistics off\n\nheader Pet\ncolor above or equal 335 @green\ncolor above or equal 235 @orange\ncolor default @red\n\nheader Knights\nmaximum on # Show fortress next to knights\ncolor above or equal 17 @green\ncolor above or equal 15 @orange\ncolor default @red\n\ncategory Fortress\n\nheader Fortress Honor'
    },
    group: {
      name: 'Guilds (dark)',
      author: 'Acclamator',
      content: '# Created by Acclamator\n\n# Show member list\nname @normal\n\n# Global settings\nstatistics on # Show statistics below the table\ndifference on # Show difference\ndifference brackets on\nindexed static\ntheme dark\ntext auto\n\n\ncategory\nheader UP\nstatistics off\nexpr now()-Timestamp\nwidth 40\nflip on\ncolor above @21days darkred\ncolor above @7days red\ncolor above @3days darkorange\ncolor above @1day orange\ncolor above @12hours yellow\ncolor default @green\nvalue default @empty\ndifference off\n\n\ncategory General\n\nheader Class\nwidth @small\nvalue equal 1 W\nvalue equal 2 M\nvalue equal 3 S\nvalue equal 4 A\nvalue equal 5 BM\nvalue equal 6 B\nvalue equal 7 DH\nvalue equal 8 D\ncolor equal 1 1874CD\ncolor equal 2 darkorchid\ncolor equal 3 lawngreen\ncolor equal 4 red\ncolor equal 5 violet\ncolor equal 6 orange\ncolor equal 7 eb605e\ncolor equal 8 13d159\n\nheader Rank\nwidth @small\n\nheader Level\nwidth @small\n\nheader Awards\nwidth @small\nhydra on # Show hydra\n\nheader Album\ncolor above 90 green\ncolor above 80 yellow\ncolor above 70 orange\ncolor above 60 darkorange\ncolor above 50 red\ncolor default darkred\n\n\ncategory Bonuses\n\nheader Treasure\nwidth @small\nalias Gold\nheader Instructor\nwidth @small\nalias EXP\nheader Knights\nwidth @small\ndifference off\nheader Pet\nwidth @small\n\n\ncategory Fights\n\nheader Gear\nexpr (Rune Gold + Rune XP >= 50 ? "Q" : "F")\nwidth @small\ncolor equal Q lightblue\ncolor equal F orange\ndifference off\nstatistics off\n\nheader Attribute\nalias Main\ndifference off\nheader Constitution\nalias Con\ndifference off\n\nheader Portal\n\n\ncategory Potion\ndifference off\n\nheader Attribute Size\nalias M\nstatistics off\ncolor equal 25 @green\ncolor equal 15 yellow\ncolor default @red\nvalue default @empty\nwidth 10\n\nheader Constitution Size\nalias C\nstatistics off\ncolor equal 25 @green\ncolor equal 15 yellow\ncolor default @red\nvalue default @empty\nwidth 10\n\nheader Life Potion\nalias E\nstatistics off\ncolor equal 1 @green\ncolor equal 0 @red\nvalue default @empty\nwidth 10\n\n\ncategory Activity\ndifference off\n\nheader Status\nalias ATM\nwidth 30\ncolor equal 0 @red\ncolor equal 1 @orange\ncolor equal 2 @green\nvalue equal 0 I\nvalue equal 1 W\nvalue equal 2 Q\n\nheader Mount\ncolor equal 4 @green\ncolor equal 3 @orange\ncolor equal 2  orange\ncolor equal 1  darkorange\ncolor default @red\n\nheader Inactive Time\nalias Last Active\nexpf datetime(Last Active)\ncolor above @21days darkred\ncolor above @7days red\ncolor above @3days darkorange\ncolor above @1day orange\ncolor above @12hours yellow\ncolor default @green'
    },
    group_light: {
      name: 'Guilds (light)',
      author: 'Acclamator',
      content: '# Created by Acclamator\n\n# Show member list\nname @normal\n\n# Global settings\nstatistics on # Show statistics below the table\ndifference on # Show difference\ndifference brackets on\nindexed static\n\n\ncategory\nheader UP\nstatistics off\nexpr now()-Timestamp\nwidth 40\nflip on\ncolor above @21days darkred\ncolor above @7days red\ncolor above @3days darkorange\ncolor above @1day orange\ncolor above @12hours yellow\ncolor default @green\nvalue default @empty\ndifference off\n\n\ncategory General\n\nheader Class\nwidth @small\nvalue equal 1 W\nvalue equal 2 M\nvalue equal 3 S\nvalue equal 4 A\nvalue equal 5 BM\nvalue equal 6 B\nvalue equal 7 DH\nvalue equal 8 D\ncolor equal 1 1874CD\ncolor equal 2 darkorchid\ncolor equal 3 lawngreen\ncolor equal 4 red\ncolor equal 5 violet\ncolor equal 6 orange\ncolor equal 7 eb605e\ncolor equal 8 13d159\n\nheader Rank\nwidth @small\n\nheader Level\nwidth @small\n\nheader Awards\nwidth @small\nhydra on # Show hydra\n\nheader Album\ncolor above 90 green\ncolor above 80 yellow\ncolor above 70 orange\ncolor above 60 darkorange\ncolor above 50 red\ncolor default darkred\n\n\ncategory Bonuses\n\nheader Treasure\nwidth @small\nalias Gold\nheader Instructor\nwidth @small\nalias EXP\nheader Knights\nwidth @small\ndifference off\nheader Pet\nwidth @small\n\n\ncategory Fights\n\nheader Gear\nexpr (Rune Gold + Rune XP >= 50 ? "Q" : "F")\nwidth @small\ncolor equal Q lightblue\ncolor equal F orange\ndifference off\nstatistics off\n\nheader Attribute\nalias Main\ndifference off\nheader Constitution\nalias Con\ndifference off\n\nheader Portal\n\n\ncategory Potion\ndifference off\n\nheader Attribute Size\nalias M\nstatistics off\ncolor equal 25 @green\ncolor equal 15 yellow\ncolor default @red\nvalue default @empty\nwidth 10\n\nheader Constitution Size\nalias C\nstatistics off\ncolor equal 25 @green\ncolor equal 15 yellow\ncolor default @red\nvalue default @empty\nwidth 10\n\nheader Life Potion\nalias E\nstatistics off\ncolor equal 1 @green\ncolor equal 0 @red\nvalue default @empty\nwidth 10\n\n\ncategory Activity\ndifference off\n\nheader Status\nalias ATM\nwidth 30\ncolor equal 0 @red\ncolor equal 1 @orange\ncolor equal 2 @green\nvalue equal 0 I\nvalue equal 1 W\nvalue equal 2 Q\n\nheader Mount\ncolor equal 4 @green\ncolor equal 3 @orange\ncolor equal 2  orange\ncolor equal 1  darkorange\ncolor default @red\n\nheader Inactive Time\nalias Last Active\nexpf datetime(Last Active)\ncolor above @21days darkred\ncolor above @7days red\ncolor above @3days darkorange\ncolor above @1day orange\ncolor above @12hours yellow\ncolor default @green'
    },
    players: {
      name: 'Browse (dark)',
      author: 'dracs',
      content: '# Color scheme\nconst green 89AA97\nconst orange FEBE8C \nconst red BB5A5A\nconst purple 907FA4\nconst yellow FFDBA4\nconst blue 424874\nconst air 1B1B2F\nconst pink FEC8D8\nconst navy A1CAE2\nconst darkgreen 5F7161\nconst beige D7C0AE\nconst white ffffff\nconst black 000000\n\ntheme dark\n\nbackground @air\nfont 95%\nname 200\n\ncategory\n\n  text @black\n\n  header Class # Compact class header\n  alias @empty\n  width @tiny\n  expf [ \'W\', \'M\', \'S\', \'A\', \'BM\', \'B\', \'DH\', \'D\', \'BR\' ][this - 1]\n  expc [ @blue, @purple, @darkgreen, @yellow, @pink, @orange, @green, @navy, @beige ][this - 1]\n  border right\n\n  header Level\n  expc gradient({ 0: @orange, 200: @yellow, 300: @green, 400: @pink, 500: @purple, 600: @blue, 700: @navy, 800: @beige }, this)\n  difference on\n  width 100\n\n  header Album\n  # Adjustable album min & ok values\n  const album_warning 0.75\n  const album_ok 0.85\n  expc gradient({ 0: @red, @album_warning: @orange, @album_ok: @yellow, 1: @green }, this / 100)\n  expf fixed(this, 2) + \' %\'\n  width 100\n\n  header Mount\n  color equal @mount50 @green\n  color equal @mount30 @yellow\n  color equal @mount20 @orange\n  color default @red\n\ncategory Basis\n  width 100\n\n  header Base\n  alias Main\n  expf fnumber\n\n  header Base Constitution\n  alias Con\n  expf fnumber\n\n  header Total\n  expr Base + Base Constitution\n  expf fnumber\n\ncategory Total\n  width 100\n\n  header Attribute\n  alias Main\n  expf fnumber\n\n  header Constitution\n  alias Con\n  expf fnumber\n\ncategory\n\n  header Ratio\n  expr trunc(100 * Attribute / (Attribute + Constitution))\n  expf format(\'{0}/{1}\', this, 100 - this)\n  order by -max(0, abs(this - 55))\n\ncategory Fortress\n\n  header Gem Mine\n  alias Mine\n  width 80\n\n  header Treasury\n  width 80\n\n  header Fortress Honor\n  alias Honor\n  expf fnumber\n  width 100\n\ncategory Guild\n\n  difference on\n  text @black\n\n  not defined value @empty\n  not defined color @air\n\n  header Pet\n  text @white\n  expc dualcolor(10, Hydra Dead ? @air: @blue, @air)\n  width 80\n\n  header Knights\n  alias HOK\n  width 80\n  # Adjustable knights min & ok values\n  const knights_warning 15\n  const knights_ok 18\n  expc gradient({ 0: @red, @knights_warning: @orange, @knights_ok: @yellow, 20: @green }, this)\n  difference on\n\n  header Last Active\n  width 160\n  difference off\n  expr Last Active < 0 ? undefined : Inactive Time\n  expf datetime(Last Active)\n  order by Last Active < 0 ? undefined : -(Inactive Time)\n  color above @21days @red\n  color above @7days @beige\n  color above @3days @orange\n  color above @1day @yellow\n  color default @green'
    },
    players_light: {
      name: 'Browse (light)',
      author: 'dracs',
      content: '# Color scheme\nconst green d3e4cd\nconst orange ffd3b5\nconst red DF6A6A\nconst purple bfa2db\nconst yellow ffffc1\nconst blue b0deff\nconst air e1f2fb\nconst pink ffcfdf\nconst navy 6886C5\nconst darkgreen 889e81\nconst beige E2C2B9\n\nbackground @air\nfont 95%\nname 200\n\ncategory\n\n  header Class # Compact class header\n  alias @empty\n  width @tiny\n  expf this == @druid ? [ \'D\', \'BD\', \'CD\' ][Mask] : (this == @bard ? [ \'RH\', \'RG\', \'RF\' ][Instrument] : [ \'\', \'W\', \'M\', \'S\', \'A\', \'BM\', \'B\', \'DH\' ][this])\n  expc this == @druid ? dualcolor(50, [ @navy, @blue, @darkgreen ][Mask], @navy) : [ \'\', @blue, @green, @darkgreen, @yellow, @pink, @orange, @purple, @navy, @beige ][this]\n  border right\n\n  header Level\n  expc gradient({ 0: @red, 100: @orange, 200: @yellow, 300: @green, 400: @pink, 500: @purple, 600: @blue, 700: @navy }, this)\n  difference on\n  width 100\n\n  header Album\n  # Adjustable album min & ok values\n  const album_warning 0.75\n  const album_ok 0.85\n  expc gradient({ 0: @red, @album_warning: @orange, @album_ok: @yellow, 1: @green }, this / 100)\n  expf fixed(this, 2) + \' %\'\n  width 100\n\n  header Mount\n  color equal @mount50 @green\n  color equal @mount30 @yellow\n  color equal @mount20 @orange\n  color default @red\n\ncategory Basis\n  width 100\n\n  header Base\n  alias Main\n  expf fnumber\n\n  header Base Constitution\n  alias Con\n  expf fnumber\n\ncategory Total\n  width 100\n\n  header Attribute\n  alias Main\n  expf fnumber\n\n  header Constitution\n  alias Con\n  expf fnumber\n\ncategory\n\n  header Ratio\n  expr trunc(100 * Attribute / (Attribute + Constitution))\n  expf format(\'{0}/{1}\', this, 100 - this)\n  order by -max(0, abs(this - 55))\n\ncategory Fortress\n\n  header Gem Mine\n  alias Mine\n  width 80\n\n  header Treasury\n  width 80\n\n  header Fortress Honor\n  alias Honor\n  expf fnumber\n  width 100\n\ncategory Guild\n  difference on\n\n  not defined value @empty\n  not defined color @air\n\n  header Pet\n  expc dualcolor(10, Hydra Dead ? @air: @blue, @air)\n  width 80\n\n  header Knights\n  alias HOK\n  width 80\n  # Adjustable knights min & ok values\n  const knights_warning 15\n  const knights_ok 18\n  expc gradient({ 0: @red, @knights_warning: @orange, @knights_ok: @yellow, 20: @green }, this)\n  difference on\n\n  header Last Active\n  width 160\n  difference off\n  expr Last Active < 0 ? undefined : Inactive Time\n  expf datetime(Last Active)\n  order by Last Active < 0 ? undefined : -(Inactive Time)\n  color above @21days @red\n  color above @7days @beige\n  color above @3days @orange\n  color above @1day @yellow\n  color above @12hours @green\n  color default @blue'
    },
    groups: {
      name: 'Groups (default)',
      author: 'mar21',
      content: '# Color scheme\nconst green 89AA97\nconst orange FEBE8C \nconst red BB5A5A\nconst purple 907FA4\nconst yellow FFDBA4\nconst blue 424874\nconst air 1B1B2F\nconst pink FEC8D8\nconst navy A1CAE2\nconst darkgreen 5F7161\nconst beige D7C0AE\nconst white ffffff\nconst black 000000\n\ntheme dark\n\nwidth policy strict\nfont 95%\nserver 120\n\nbackground @air\n\ncategory General\n\nheader Guild Member Count\nalias Members\nexpc gradient({ 0: @red, 49: @orange, 50: @green }, this)\n\nheader ø Level\nexpr average(map(Guild Members, Level(this)))\nexpf round\n\ncategory Upgrades\n\nheader Guild Knights\nalias Knights\n\nheader Guild Treasure\nalias Treasure\nexpc gradient({ 0: @red, 199: @orange, 200: @green }, this)\n\nheader Guild Instructor\nalias Instructor\nexpc gradient({ 0: @red, 199: @orange, 200: @green }, this)\n\ncategory Resources\n\nheader Guild Knights 15+\nalias Black Gem %\nexpc gradient({ 0: @red, 45: @orange, 50: @green }, this)\n\ncategory Dungeons\n\nheader Guild Raids\nalias Raids\nexpc this >= 50 ? @green : @red\n\nheader Guild Portal Floor\nalias Portal\nexpc this >= 50 ? @green : @red\n\nheader Guild Hydra\nalias Hydra\n\nheader Guild Pet Level\nalias Pet Level\n\ncategory Hall of Fame\n\nheader Guild Honor\nalias Honor\n\nheader Guild Rank\nalias Rank\n\ncategory Hellevator\n\nheader Guild GT Rank\nalias Rank\n\nheader Guild GT Tokens\nalias Tokens'
    },
    actions: {
      content: '# Example - Tag every player above level 600 with tag Legend:\n# tag player as \'Legend\' if Level > 600\n\n# Example - Tag file as Legendary if it includes your own character:\n# tag file as \'Legendary\' if some(players, Own)\n\n# Example - Reject players from import that are not from Int 30:\n# reject player if Prefix != \'W30 .NET\'\n\n# Tracker Example - Saves the date when the character reached level 100\n# track Level100 when Level >= 100\n\n# Tracker Example - Saves the level at which the character was when reaching tower 100\n# track LevelAtTower100 as Level when Tower == 100'
    }
  }

  static exists (key) {
    return !!this.#internal[key];
  }

  static get (key) {
    return this.#internal[key];
  }

  static entries () {
    return Object.entries(this.#internal);
  }

  static getContent (key) {
    return this.#internal[key].content;
  }
}
