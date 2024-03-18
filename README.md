# Solution

I've used mobx to manage the state of the app.
State is shared via context.

Implemented:

- image upload history
- folder rename

There is a generic "FolderTree" component that can be used to selct where to move image if want to change image position.

**Unimplemented in UI, but supported in data-model:**

- working with folder tree structure: create subfilders
- attaching image to a folder (`filderId` in ImageItem model)

**Missing functionality:**

- localStorage persistance

# Getting Started with this template

Make sure you follow the .nvmrc and use Node 18

Start the app using the following command, replacing the key by your API key:

    VITE_API_KEY="your_api_key" pnpm run dev

## Setup

```sh
# use the right node.js version
nvm use

# Install depedencies and set up repository.
pnpm i

# run the app
pnpm dev

# run Storybook
pnpm storybook
```
