(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.$el = $el;
    $el.append(this.setupBoard());
    this.game = game;
    this.bindEvents();

  };

  View.prototype.bindEvents = function () {
    this.$el.find("ul").on("click", this.makeMove.bind(this));


  };

  View.prototype.makeMove = function (e) {
    var $sq = $(e.target);
    var numPos = $sq.data("pos");
    var pos = [(Math.floor(numPos/3)), (numPos % 3)];
    try {
      this.game.playMove(pos);
    }
    // rescue MoveError -- prompt
    catch(err) {
      alert("Invalid move - try again");
      return;
    }
    var mark = this.game.board.grid[pos[0]][pos[1]];
    $sq.css("background-color", "transparent");
    $sq.append(mark);
    $sq.addClass(mark);

    // debugger;

    if (this.game.board.isOver()) {
      $("ul").off("click");
      $("li").css("background-color", "transparent");
      if (this.game.board.winner()){
        $("body").find(".win-message").append("Congrats, you won, " + this.game.board.winner());
        $("body").find("." + mark).css("background-color", "cornflowerblue");
        $("body").find("." + mark).css("opacity", "0.5");
      }
      alert("the game is over, go outside!!");
    }
  };

  View.prototype.setupBoard = function () {
    // $("tagName.className") => selects elements from the DOM
    // $("<tagName>") || $("<tagName></tagName>") => returns a new element
    // $(function () {}) => document ready callback
    var $ul = $("<ul></ul>");
    for (var i = 0; i < 9; i++) {
      var sq = $("<li>");
      sq.data("pos", i);
      $ul.append(sq);
      // $ul.append($("<li data='pos, " + i + "'></li>"));
      // $ul.append($("<li></li>")).data('pos:', i);
    }
    return $ul;
  };
})();
