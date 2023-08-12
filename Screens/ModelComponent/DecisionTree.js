class DecisionTree {
    constructor() {
      this.tree = null;
    }
  
    train(data, labels) {
      this.tree = this.buildTree(data, labels);
    }
  
    buildTree(data, labels) {
      // Implement the decision tree algorithm here using range conditions
      // For example, you can use the following rules:
      // If temperature > 20 and temperature <= 25, classify as cloudy
      // If temperature > 25 and humidity <= 70, classify as sunny
      // If humidity > 70 and wind speed <= 5, classify as rainy
      // Otherwise, classify as thunder
  
      // In a real-world scenario, you would use more sophisticated algorithms to build the decision tree.
      // However, for the purpose of this example, we'll keep it simple.
  
      return {
        rule: "temperature > 25",
        trueBranch: { result: "Sunny" },
        falseBranch: { result: "Rainy" },
      };
    }
  
    predict(inputs) {
      // Use the trained decision tree to make predictions
      return this.traverseTree(inputs, this.tree);
    }
  
    traverseTree(inputs, node) {
      if (node.result !== undefined) {
        // If the node is a leaf node, return the result
        return node.result;
      }
  
      const { rule, trueBranch, falseBranch } = node;
  
      const expression = rule.split(" ");
      const operator = expression[1];
      const feature = expression[0];
      const value = inputs[feature];
  
      if (operator === ">") {
        if (value > parseFloat(expression[2])) {
          return this.traverseTree(inputs, trueBranch);
        } else {
          return this.traverseTree(inputs, falseBranch);
        }
      } else if (operator === "<=") {
        if (value <= parseFloat(expression[2])) {
          return this.traverseTree(inputs, trueBranch);
        } else {
          return this.traverseTree(inputs, falseBranch);
        }
      }
    }
  }
  
  export default DecisionTree;
  