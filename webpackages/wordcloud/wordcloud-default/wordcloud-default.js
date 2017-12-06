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
    },

    /**
     * Manipulate an element’s local DOM when the element is created and initialized.
     */
    ready: function () {
    },

    /**
     * Manipulate an element’s local DOM when the element is attached to the document.
     */
    attached: function () {
      this.DEFAULT_OPTIONS = {
        gridSize: Math.round(10 * this._getWordcloudElement().clientWidth / 1024),
        weightFactor: function (size) {
          return Math.pow(size, 2.3) * this._getWordcloudElement().clientWidth / 1024;
        }.bind(this),
        fontFamily: 'Times, serif',
        color: function (word, weight) {
          return (weight === 12) ? '#f02222' : '#c09292';
        },
        rotationSteps: 2,
        backgroundColor: '#ffe0e0'
      }
    },

    /**
     * Manipulate an element’s local DOM when the cubbles framework is initialized and ready to work.
     */
    cubxReady: function () {
      this._options = this.DEFAULT_OPTIONS;
      this._updateWordCloud();
    },

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

    _updateWordCloud: function () {
      if (this._options) {
        this._setListIfNeeded();
        if (this._options.list) {
          this._displayProperWordcloudElement();
          WordCloud(this._getWordcloudElement(), this._options);
        }
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
      var wordcloudCanvas = this.$$('#wordcloudCanvas');
      var wordcloudDiv = this.$$('#wordcloudDiv');
      if (this.getUseCanvas()) {
        this._displayElement(wordcloudCanvas);
        this._hideElement(wordcloudDiv);
      } else {
        this._displayElement(wordcloudDiv);
        this._hideElement(wordcloudCanvas);
      }
    },

    _displayElement: function (element) {
      element.style.display= 'block';
    },

    _hideElement: function (element) {
      element.style.display= 'none';
    },

    _getWordcloudElement: function () {
      if (this.getUseCanvas()) {
        return this.$$('#wordcloudCanvas');
      } else {
        return this.$$('#wordcloudDiv');
      }
    }
  });
}());
