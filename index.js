// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random array of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function to create a new pAequor object 
const pAequorFactory = (num, dnaArr) => {
  return {
    specimenNum: num,
    dna: dnaArr,
    mutate() {
      // To pull a random dna base from the original arr
      const randomIndex = Math.floor(Math.random() * 15);
      // console.log(`randomIndex: ${randomIndex}`); // To test random index 
      const oldRandBase = dnaArr[randomIndex]; 
      // console.log(`oldRandBase: ${oldRandBase}`); // To see original random dna base 
      // To pull a new random base and making sure it doesn't match the old base
      const generateRandBase = () => {
        let currentRandBase = returnRandBase();
        // If the bases match then it reruns the function, otherwise it reassigns the dna prop 
        return currentRandBase === oldRandBase ? generateRandBase() : this.dna[randomIndex] = currentRandBase;
      }
      const newRandBase = generateRandBase();
      // console.log(`newRandBase: ${newRandBase}`); // To see new random dna base 
    },
    compareDNA(pAequorObj) {
      // Creates an arr to store matched elements and a variable to calc the original length 
      const matchedArr = [];
      const originalSum = this.dna.length;
      // Loops through the arrays and pushes the matched elements to the matchedArr
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequorObj.dna[i]) {
          matchedArr.push(i);
        }
      }
      // Finds the percentage of the matched results
      const matchedSum = matchedArr.length;
      const matchedPerc = Math.round(matchedSum / originalSum * 100);
      //console.log(matchedArr);  // Testing the matched elements
      console.log(`Specimen #1 and specimen #2 have ${matchedPerc}% DNA in common`);
    },
    willLikelySurvive() {
      const desiredBases = [];
      const originalSum = this.dna.length;
      // Loops through the array to find elements C or G and pushes them to desiredBases
      this.dna.forEach(elem => {
        if (elem === 'C' || elem === 'G') {
          desiredBases.push(elem);
        }
      });
      //console.log(desiredBases) // To see the matched bases
      const matchedSum = desiredBases.length;
      //console.log(matchedSum) // To check the length of the matched base arr
      const matchedPerc = Math.round(matchedSum / originalSum * 100);
      //console.log(matchedPerc) // To test the accuracy of the results
      return matchedPerc >= 60;
    }
  }
};

const addingSurvivors = func => {
  const pAequorSurvivors = [];  // Sets up an arr to store survivors
  if (pAequorSurvivors.length !== 30) { 
    // Loops as long as survivor arr !== 30 in length
    for (let i = 0; pAequorSurvivors.length < 30; i++) {  
      let survivor = func(i, mockUpStrand());  // Makes the survivor in each loop 
      if (survivor.willLikelySurvive()) {  // Determines if they are likely to survive
        pAequorSurvivors.push(survivor);  // If so pushes them to the survivor arr
      }
    }
  }
  //console.log(pAequorSurvivors.length); // To test the final arr length
  return pAequorSurvivors;
};

const survivors = addingSurvivors(pAequorFactory);  

/* Testing comments */  

//const newSpecies = pAequorFactory(1, mockUpStrand()); // Creates new species obj
//console.log(newSpecies);  // To see original dna arr
//newSpecies.mutate();  // Runs the mutate method
//console.log(newSpecies); // To check new mutated dna arr
//const secondSpecies = pAequorFactory(2, mockUpStrand()); // Creates second species obj
//console.log(secondSpecies); To compare the properties of the second species to the first
//console.log(newSpecies.compareDNA(secondSpecies)); // To test the compareDNA method
//console.log(newSpecies.willLikelySurvive());
//console.log(survivors[0].willLikelySurvive());  // Testing likely to survive on first elem
//console.log(survivors[29].willLikelySurvive()); // Testing likely to survive on last elem