# Shortcut
Shortcut is a little library to help make shortcut handling easier and more flexible.

## Why use Shortcut?
Normally, to handle shortcuts, the go-to method is to just check `event` like so:
```js
document.addEventListener("keydown", event => {
  if (event.ctrlKey && event.key == "k") {
    // Code goes here
  }
})
```

But this method has some flaws:
* **You can't make a combination of normal keys**, like <kbd>F2</kbd> + <kbd>K</kbd>, or <kbd>/</kbd> + <kbd>1</kbd>.
* **You can accidentally allow extra keys**, like Shift or Alt, if you don't make sure that they're false.

## How to use Shortcut
Using Shortcut is easy once you understand how to what values you can pass to it's prompt object:

**`alt`, `control`, `meta`, `shift`**: These are the special keys in a normal KeyboardEvent.
* `true`: This key must be pressed for the function to fire.
* `null` or `undefined`: It doesn't matter if this key is pressed down or not.
  * When `implict` is not set to `true`, `undefined` is regarded as `false`.
* `false`: This key must NOT be pressed for the callback function to fire.

**`keys`**: An array of normal keys that are required. Like `event.key`, except case-insensitive.

**`implict`**: If true, special keys that are `undefined` will be allowed.

**`repeat`**: When `true`, the shortcut can repeat when held down.

### Examples
Here's an example of a Shortcut that handles <kbd>Ctrl</kbd> + <kbd>K</kbd>:
```js
new Shortcut({ control: true, keys: ["k"] }, () => { 
  // Code goes here
})
```

Another example that fires when <kbd>A</kbd> is pressed once:
```js
new Shortcut({ keys: ["a"], implict: true }, event => {
  // Code goes here
})
```

One more example for <kbd>F2</kbd> + <kbd>E</kbd>:
```js
new Shortcut({ keys: ["F2", "E"] }, event => {
  // Code goes here
})
```

### Killing a Shortcut
You can easily kill a Shortcut by calling it's `kill()` method.

## Credits
This library was made by [Aetinx](https://aetinx.lata.dev) for Latapals.

Licensed under [CC BY-ND 4.0](http://creativecommons.org/licenses/by-nd/4.0/).

![CC BY-ND](https://licensebuttons.net/l/by-nd/4.0/88x31.png)
