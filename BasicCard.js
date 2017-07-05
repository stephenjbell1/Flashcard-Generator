var newBasic = function(front, back) {
	this.front = front;
	this.back = back;
}

newBasic.prototype.printInfo = function() {
  console.log("Question: " + this.front + "\nAnswer: " + this.back + "\n-------------------------");
};

module.exports = newBasic;