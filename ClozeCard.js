var newCloze = function (full, cloze) {
	this.fullText = full;
	this.cloze = cloze;
	this.partial = this.fullText.replace(this.cloze, '"_____"');
}

newCloze.prototype.printInfo = function() {
  console.log("\nFull Sentence: " + this.fullText + "\nCloze Sentence: " + this.cloze + "\nFlashcard: " + this.partial + "\n-------------------------");
};


module.exports = newCloze;