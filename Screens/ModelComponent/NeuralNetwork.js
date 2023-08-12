class NeuralNetwork {
  constructor(inputNodes, hiddenNodes, outputNodes) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;

    this.weightsInputHidden = new Array(this.hiddenNodes).fill(null).map(() =>
      new Array(this.inputNodes).fill(null).map(() => Math.random())
    );

    this.weightsHiddenOutput = new Array(this.outputNodes).fill(null).map(() =>
      new Array(this.hiddenNodes).fill(null).map(() => Math.random())
    );

    this.biasHidden = new Array(this.hiddenNodes).fill(0);
    this.biasOutput = new Array(this.outputNodes).fill(0);

    this.learningRate = 0.1;
  }

  sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }

  sigmoidDerivative(x) {
    return x * (1 - x);
  }

  feedForward(inputs) {
    const hiddenInputs = this.weightsInputHidden.map((weights, i) =>
      inputs.reduce((sum, input, j) => sum + input * weights[j], this.biasHidden[i])
    );

    const hiddenOutputs = hiddenInputs.map((val) => this.sigmoid(val));

    const outputInputs = this.weightsHiddenOutput.map((weights, i) =>
      hiddenOutputs.reduce((sum, output, j) => sum + output * weights[j], this.biasOutput[i])
    );

    const outputs = outputInputs.map((val) => this.sigmoid(val));

    return outputs;
  }

  train(inputs, targets) {
    const hiddenInputs = this.weightsInputHidden.map((weights, i) =>
      inputs.reduce((sum, input, j) => sum + input * weights[j], this.biasHidden[i])
    );

    const hiddenOutputs = hiddenInputs.map((val) => this.sigmoid(val));

    const outputInputs = this.weightsHiddenOutput.map((weights, i) =>
      hiddenOutputs.reduce((sum, output, j) => sum + output * weights[j], this.biasOutput[i])
    );

    const outputs = outputInputs.map((val) => this.sigmoid(val));

    const outputErrors = targets.map((target, i) => target - outputs[i]);
    const outputDeltas = outputErrors.map((error, i) => error * this.sigmoidDerivative(outputs[i]));

    const hiddenErrors = this.weightsHiddenOutput[0].map((_, i) =>
      outputDeltas.reduce((sum, delta, j) => sum + delta * this.weightsHiddenOutput[j][i], 0)
    );

    const hiddenDeltas = hiddenErrors.map((error, i) => error * this.sigmoidDerivative(hiddenOutputs[i]));

    for (let i = 0; i < this.outputNodes; i++) {
      for (let j = 0; j < this.hiddenNodes; j++) {
        this.weightsHiddenOutput[i][j] += outputDeltas[i] * hiddenOutputs[j] * this.learningRate;
      }
      this.biasOutput[i] += outputDeltas[i] * this.learningRate;
    }

    for (let i = 0; i < this.hiddenNodes; i++) {
      for (let j = 0; j < this.inputNodes; j++) {
        this.weightsInputHidden[i][j] += hiddenDeltas[i] * inputs[j] * this.learningRate;
      }
      this.biasHidden[i] += hiddenDeltas[i] * this.learningRate;
    }
  }
}

export default NeuralNetwork;