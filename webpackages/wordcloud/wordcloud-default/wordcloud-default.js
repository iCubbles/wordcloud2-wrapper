(function () {
  'use strict';
  /**
   * Get help:
   * > Lifecycle callbacks:
   * https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html#lifecycle-callbacks
   *
   * Access the Cubbles-Component-Model:
   * > Access slot values:
   * slot 'a': this.getA(); | this.setA(value)
   */
  CubxPolymer({
    is: 'wordcloud-default',

    /**
     * Manipulate an element’s local DOM when the element is created.
     */
    created: function () {
      this.DEFAULT_OPTIONS = {
        weightFactor: function (size) {
          return Math.pow(size, 2.3) * this._getWordcloudElement().clientWidth / 1024;
        }.bind(this),
        fontFamily: 'Times, serif',
        color: function (word, weight) {
          return (weight === 10) ? '#f02222' : '#c09292';
        },
        rotationSteps: 2,
        backgroundColor: '#ffe0e0'
      }
    },

    /**
     * Manipulate an element’s local DOM when the element is created and initialized.
     */
    ready: function () {},

    /**
     * Manipulate an element’s local DOM when the element is attached to the document.
     */
    attached: function () {},

    /**
     * Manipulate an element’s local DOM when the cubbles framework is initialized and ready to work.
     */
    cubxReady: function () {},

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'list' has changed ...
     */
    modelListChanged: function (newList) {
      if(this._options) {
        this._options.list = newList;
        this._updateWordCloud();
      }
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'useCanvas' has changed ...
     */
    modelUseCanvasChanged: function (useCanvas) {
      this._updateWordCloud();
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'options' has changed ...
     */
    modelOptionsChanged: function (options) {
      this._updateOptions(options);
      this._updateWordCloud();
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'dimensions' has changed ...
     */
    modelDimensionsChanged: function (dimensions) {
      if (this._isValidDimensionsObject(dimensions)) {
        this._updateSize(dimensions);
        this._updateWordCloud();
      }
    },

    _updateSize: function (size) {
      if(this.getUseCanvas()){
        this._updateCanvasSize(size);
      } else {
        this._updateDivSize(size);
      }
    },

    _updateCanvasSize: function (size) {
      if (size.hasOwnProperty('width')) {
        this._setDimensionToCanvas(size.width, 'width');
      }
      if (size.hasOwnProperty('height')) {
        this._setDimensionToCanvas(size.height, 'height');
      }
    },

    _setDimensionToCanvas: function (dimension, dimensionName) {
      if (this._isValidCanvasDimension(dimension)) {
        this._getCanvasElement().setAttribute(dimensionName, dimension);
      } else {
        this._logInvalidCanvasDimension(dimensionName, dimension);
      }
    },

    _setDimensionToDiv: function (dimension, dimensionName) {
      if (this._isValidCssDimension(dimension)) {
        this._getDivElement().style[dimensionName] = dimension;
      } else {
        this._logInvalidCssDimension(dimensionName, dimension);
      }
    },

    _logInvalidCssDimension: function (dimensionName, dimension) {
      console.error(dimension + ' is an invalid ' + dimensionName + ' for the div.' +
        'It should be a css valid dimension (e.g. "10em" or "10px")');
    },

    _logInvalidCanvasDimension: function (dimensionName, dimension) {
      console.error(dimension + ' is an invalid ' + dimensionName + ' for the canvas.' +
        'It should be a number or a pixels dimension (e.g. "10" or "10px")');
    },

    _updateDivSize: function (size) {
      if (size.hasOwnProperty('width')) {
        this._setDimensionToDiv(size.width, 'width');
      }
      if (size.hasOwnProperty('height')) {
        this._setDimensionToDiv(size.height, 'height');
      }
    },

    _updateOptions: function(newOptions) {
      if (!this._options) {
        this._options = newOptions;
      } else {
        Object.keys(newOptions).forEach(function (key) {
          this._options[key] = newOptions[key];
        }.bind(this))
      }
    },

    _updateWordCloud: function () {
      if (!this._options) {
        this._options = this.DEFAULT_OPTIONS;
      }
      this._setListIfNeeded();
      if (this._options.list) {
        this._displayProperWordcloudElement();
        WordCloud(this._getWordcloudElement(), this._options);
      }
    },

    _setListIfNeeded: function () {
      if (!this._options.list) {
        if (!this.getList()) {
          return;
        }
        this._options.list = this.getList();
      }
    },

    _displayProperWordcloudElement: function () {
      var wordcloudCanvas = this._getCanvasElement();
      var wordcloudDiv = this._getDivElement();
      this._cleanElement(wordcloudCanvas);
      this._cleanElement(wordcloudDiv);
      if (this.getUseCanvas()) {
        this._displayElement(wordcloudCanvas);
        this._hideElement(wordcloudDiv);
      } else {
        this._displayElement(wordcloudDiv);
        this._hideElement(wordcloudCanvas);
      }
    },

    _cleanElement: function (element){
      element.innerHTML = '';
    },

    _displayElement: function (element) {
      element.style.display= 'block';
    },

    _hideElement: function (element) {
      element.style.display= 'none';
    },

    _getWordcloudElement: function () {
      if (this.getUseCanvas()) {
        return this._getCanvasElement();
      } else {
        return this._getDivElement();
      }
    },

    _getCanvasElement: function () {
      return this.$$('#wordcloudCanvas');
    },

    _getDivElement: function () {
      return this.$$('#wordcloudDiv');
    },

    _isValidCanvasDimension: function (dimension) {
      return /^\d+\.?\d+(px)?$/.test(dimension)
    },

    _isValidCssDimension: function (dimension) {
      return /^(auto|0)$|^\d+\.?\d+(px|em|ex|%|in|cm|mm|pt|pc)$/.test(dimension)
    },

    _isValidDimensionsObject: function (dimensionsObject) {
      return dimensionsObject.hasOwnProperty('width') || dimensionsObject.hasOwnProperty('height')
    }
  });
}());
