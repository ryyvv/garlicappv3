class DecisionTree {
    constructor(data) {
      this.data = data;
    }
  
    majorityClass(data) {
      const counts = {};
      data.forEach((row) => {
        const label = row.label;
        counts[label] = (counts[label] || 0) + 1;
      });
  
      const maxCount = Math.max(...Object.values(counts));
      const majorityLabel = Object.keys(counts).find((label) => counts[label] === maxCount);
      return majorityLabel;
    }
  
    calculateEntropy(data) {
      const totalCount = data.length;
      const counts = {};
      data.forEach((row) => {
        const label = row.label;
        counts[label] = (counts[label] || 0) + 1;
      });
  
      const probabilities = Object.values(counts).map((count) => count / totalCount);
      const entropy = probabilities.reduce((sum, p) => sum - p * Math.log2(p), 0);
      return entropy;
    }
  
    findBestSplit(data, features) {
      let bestFeature = null;
      let bestThreshold = null;
      let bestGain = -Infinity;
  
      for (const feature of features) {
        const uniqueValues = [...new Set(data.map((row) => row.features[feature]))];
        for (const value of uniqueValues) {
          const leftSubset = data.filter((row) => row.features[feature] <= value);
          const rightSubset = data.filter((row) => row.features[feature] > value);
  
          if (leftSubset.length === 0 || rightSubset.length === 0) {
            continue;
          }
  
          const entropyBefore = this.calculateEntropy(data);
          const entropyLeft = this.calculateEntropy(leftSubset);
          const entropyRight = this.calculateEntropy(rightSubset);
  
          const pLeft = leftSubset.length / data.length;
          const pRight = rightSubset.length / data.length;
  
          const infoGain = entropyBefore - (pLeft * entropyLeft + pRight * entropyRight);
  
          if (infoGain > bestGain) {
            bestGain = infoGain;
            bestFeature = feature;
            bestThreshold = value;
          }
        }
      }
  
      return { feature: bestFeature, threshold: bestThreshold };
    }
  
    buildTree(data, features) {
      const labels = data.map((row) => row.label);
      if (labels.every((label) => label === labels[0])) {
        return { label: labels[0] };
      }
  
      if (features.length === 0) {
        return { label: this.majorityClass(data) };
      }
  
      const { feature, threshold } = this.findBestSplit(data, features);
      const leftSubset = data.filter((row) => row.features[feature] <= threshold);
      const rightSubset = data.filter((row) => row.features[feature] > threshold);
  
      const leftTree = this.buildTree(leftSubset, features.filter((f) => f !== feature));
      const rightTree = this.buildTree(rightSubset, features.filter((f) => f !== feature));
  
      return { feature, threshold, left: leftTree, right: rightTree };
    }
  
    predict(tree, sample) {
      if (!tree.left && !tree.right) {
        return tree.label;
      }
  
      if (sample.features[tree.feature] <= tree.threshold) {
        return this.predict(tree.left, sample);
      } else {
        return this.predict(tree.right, sample);
      }
    }
  }
  
  export default DecisionTree;
  