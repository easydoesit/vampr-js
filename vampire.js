class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfCreators = 0;
    let currentVamp = this;
    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      numberOfCreators++;
    }
    return numberOfCreators;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
    
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (this === vampire) {
      return this;
    }
    
    if (this.name === 'root') {
      return this;
    }

    if (this.numberOfVampiresFromOriginal <=  1 || vampire.numberOfVampiresFromOriginal <= 1) {
      return this.creator;
    }

    for (let i in this.offspring) {
      if (this.offspring[i] === vampire)
        return this;
    }

    for (let i in vampire.offspring) {
      if (vampire.offspring[i] === this)
        return vampire;
    }

    const thisLine = [];
    const vampireLine = [];
    let currentThis = this;
    let currentVamp = vampire;

    while (currentThis.creator) {
      thisLine.push(currentThis.creator);
      currentThis = currentThis.creator;
    }

    while (currentVamp.creator) {
      vampireLine.push(currentVamp.creator);
      currentVamp = currentVamp.creator;
    }

    for (let i in thisLine) {
      for (let j in vampireLine) {
        if (thisLine[i] === vampireLine[j]) {
          return thisLine[i];
        }
      }
    }

  }
}

module.exports = Vampire;
