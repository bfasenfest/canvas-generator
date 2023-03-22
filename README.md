# v2-canvas-generator

This is the new approach to the info management of the canvas. The main change is that **we use Vite and Vue 3 with Tailwind & Pinia**, but also it's important to remind that we need in-line style css for the components that are made to be copied or exported, and some CSS rules are overrided or directly not supported by the Columbia Website cause they have CSS classes for that, consult that with Bernhard.

## Dragging Logic

### The Original Approach

In the original version we use a system of three arrays of objects for each part of the canvas: rows, columns and slots. They reference to each other by keys simulating a typical SQL data structure. Thing is we are using local storage to persist this info, so **treating local storage as a whole SQL Database make us parse data and searching certain elements in big lists that reference all the documents of the course all the time**, consuming many resources from the client.

This is an example:

```
{
  rows: [
    {
      id: 1,
      // -- rest of info -- //
    }
  ],
  columns: [
    {
      id: 2,
      rowId: 1,
      // -- rest of info -- //
    }
  ],
  slots: [
    {
      id: 3,
      rowId: 1,
      colId: 2,
      // -- rest of info -- //
    }
  ]
}
```

### Proposed Solution

**The new version proposes a nested architecture of lists for all the elements in every canvas.** So we can separate every HTML Document and it's correspondent JSON array in a separated storage, making it easier to inspect and render. Also by saving it as HTML we avoid to render every page of the course builder on the export page, but just parse it and use into the selected export method.

On the other side, **we store a separated JSON array of the canvas to rerender dynamic and static components** (which will be explained soon) using Vue on our side. So, in short: HTML to export, JSON to render, both saved in their own storage to persist.

The proposed architecture is the following:

```
// Canvas Level
[
  // Row Level
  [
    // Column Level
    [
      // Example of Dynamic Slot
      {
        /* Name needs to be parsed by a composable that takes this string
           (the name of the component) and replaces it with the component
           (Vue needs this component to be processed by a function called markRaw()) */
        name: String,
        dynamic: Boolean // Obviously true always, used to separate dynamic ones from static
      },
      // Example of Static Slot
      {
        html: String // HTML parseable string only,
        /* For now used only for images, cause they need their modal to edit their attributes.
           For images the type is 'img' */
        type: String,
        edit: Boolean // Used to show editors
      }
    ]
  ]
]
```

So if a user drags a column **vue-drag-next** will just move it inside the canvas level array, same for columns and slots in their own levels.

### How do we found elements without an ID?

The benefit of a nested array architecture and an interactive HTML DOM that represents it (only makes sense in this scale of data, remember **we are splitting info into different storages per page**) is that we can find elements by a real time made ID sent by the element whose event is triggered. For example:

1. User double clicks a static slot.
2. The function that handles the event receives three arguments: **rowIndex**, **colIndex** and **slotIndex** and forms an ID (eg.: '100' means second row, first column, first index.)
3. Function takes the content array and do the following:

```
  content[rowIndex][colIndex][slotIndex].edit = true
```

4. Editor is shown replacing the static slot (mantaining same order), ID should be stored on a list of oppened editors if necessary.
5. User finishes and hit cancel or save, triggering a handler that receives rowIndex, colIndex and slotIndex to do this:

```
  content[rowIndex][colIndex][slotIndex].edit = false
```

We can save the IDs like the previous '100' example for any purpouse we need. **Because dynamic slots have their own logic in their Vue Components, they shouldn't need IDs**, but we can use them given the case cause in the end we are just putting indexes together.

## Static and Dynamic Slots

The previous version had a component for every slot type. In this approach, **we are only using Vue Components for what we call 'Dynamic' Slots.** The difference is simple:

- Dynamic: **connected with a Pinia store**, so it needs a component (eg.: the image banner needs to change if the user selects another organization.)

- Static: **content that only represents itself** (eg: a paragraph, an image.)

## Extras

- We have shortcuts to show drag helpers (alt + a) and quitters (alt + s).
- We have an event bus to communicate unrelated (directly, not by extension) pages or components, it's **emitter** and you can import it from composables.

## To Do List

- [ ] Move hardwritten content to a default JSON object to use in the case the user wants to restore data to default or in the case there is no data saved.

- [ ] Build a parser to transform content array into JSON stringified data and components replaced for their names to save it on localStorage.

- [ ] Build a parser to transform JSON saved in localStorage to an array with markRaw processed components so the Vue can render it.

- [ ] Handle multiple opened editors for static slots.

- [ ] Make padding bigger to move rows and columns easier, but remove them on HTML code copy.

- [ ] Make button to copy all the HTML inside an element with id canvasContainer.

- [ ] Give a minimun height to an empty row and update delete button position.

- [ ] Create a JSON with templates for the createSlot modal.

- [ ] Create modal to add slots globally (by creating a new row and column to contain it) and buttons to add them on certain columns or rows (in a new column).

- [ ] Create stores for every page of the course builder that needs it.

- [ ] Create Dynamic Components related to Activity List and each individual activity.

- [ ] Develop a version management system.

- [ ] Reuse most of the original export logic to pass the HTML to an .imscc file.

- [ ] Develop export JSON logic, a big object that have every content array in a property with the name of their storage, for example:

```
{
  courseHome: {
    html: '<p>Hi</p>',
    json: [[[{ html: '<p>Hi</p>', edit: false }]]]
  },
  activityList: {
    html: '<img src="example.url/image.png" />',
    json: [[[{ name: 'ImageBanner', dynamic: true }]]]
  }
}
```

- [ ] Create import JSON logic (only applicable to data that follows the proposed architecture).
