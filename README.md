This project was based on the official atlas obscura new tab extension:
@see: https://chrome.google.com/webstore/detail/atlas-obscura-tabs/odbdedlpknlpnibidnmjcmlopgegggbi?hl=en

### Installation

Follow the steps in the latest release: https://github.com/jesusoterogomez/chrome_extension_atlas_obscura/releases

### What is it?
A Chrome extension that replaces your new tab page with a random place from Atlas Obscura

<img width="1277" alt="Screen Shot 2020-04-20 at 11 04 30 AM" src="https://user-images.githubusercontent.com/5709736/79734316-cfe9e780-82f6-11ea-922c-36995552d951.png">

### Why?
I was missing something that showed something interesting whenever I opened a new tab in my browser. I was looking for something simple (Something that looked like the backdrop images from Chromecast). In my search, I found the [Official Atlas Obscura extension](https://community.atlasobscura.com/t/introducing-the-atlas-obscura-chrome-extension/31566)

However, I found out that the experience and performance could be improved, some problems I found were:
- [Flash of unstyled content](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)
- Animations didn't sync well
- Images and other assets were downloaded from network every time a tab was opened, this meant that performance was variable on every load.

With some free time on my hands, I decided to reverse engineer the project and reimplement it, with mostly the same functionality

**Improvements:**
- I made some minimal overall changes to the appearance
- Animations are now smoother and staggered when necessary (When loading takes longer as expected, for example)
- Added support for displaying weather in the current location in the right lower corner _(a la Chromecast)_
