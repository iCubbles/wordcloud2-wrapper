## wordcloud
Webpackage containing component to create a wordcloud using the wordcloud2js library
### Webpackage Artifacts
| Name | Type | Description | Links |
|---|---|---|---|
| **docs** | Application | Generated webpackage documentation. | [docs](https://cubbles.world/shared/wordcloud@1.1.0/docs/index.html) |
| **wordcloud-default** | Elementary Component | Elementary component to create a wordcloud using the wordcloud2js library | [demo](https://cubbles.world/shared/wordcloud@1.1.0/wordcloud-default/demo/index.html) [docs](https://cubbles.world/shared/wordcloud@1.1.0/wordcloud-default/docs/index.html) |
### Use of components
The html file should contain the desire component using its tag, e.g. the `<wordcloud-default>`, as follows:
```html
<wordcloud-default cubx-webpackage-id="wordcloud@1.1.0"></wordcloud-default>
```
Note that the `webpackageId` should be provided as attribute, which in this case is: `wordcloud@1.1.0`.

Additionally, this component can be initialized using the `<cubx-core-slot-init>` tag (available from _cubx.core.rte@1.9.0_).
For example, lets initialize the `list` slot to get the basic package of ckeditor:

```html
<wordcloud-default cubx-webpackage-id="wordcloud@1.1.0">
    <!--Initilization-->
    <cubx-core-init style="display:none">
        <cubx-core-slot-init slot="list">[["Cubbles", 12], ["elementary", 8],["compound", 8], ["component", 8], ["webpackage", 6], ["webcomponent", 4]]</cubx-core-slot-init>
    </cubx-core-init>
</wordcloud-default>
```

Or it can be initialized and later manipulated from Javascript as follows:

```javascript
var component= document.querySelector('wordcloud-default');
// Wait until CIF is ready
document.addEventListener('cifReady', function() {
  // Manipulate slots
  component.setList([["Cubbles", 12], ["elementary", 8],["compound", 8], ["component", 8], ["webpackage", 6], ["webcomponent", 4]]);
});
```

[Want to get to know the Cubbles Platform?](https://cubbles.github.io)
