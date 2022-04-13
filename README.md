# @caminkunick/data-grid-editor

> made from [Material-ui](https://mui.com/x/react-data-grid/components/#main-content) DataGrid [create-react-library](https://www.npmjs.com/package/create-react-library) and [FontAwesomeIcon](https://fontawesome.com)

[![NPM](https://img.shields.io/npm/v/@caminkunick/data-grid-editor.svg)](https://www.npmjs.com/package/@caminkunick/data-grid-editor) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<br />

![screenshot](/Screen%20Shot.png)

<br />

## Install

```bash
npm install --save @caminkunick/data-grid-editor
```

## Usage

```tsx
// TYPESCRIPT

import * as React from 'react'
import {
  DataGridEditor,
  DataGridEditorData,
  DataGridEditorDefaultData
} from '@caminkunick/data-grid-editor'
import '@caminkunick/data-grid-editor/dist/index.css'

export const Example = () => {
  const [data, setData] = React.useState<DataGridEditorData>({
    ...DataGridEditorDefaultData
  })

  return (
    <DataGridEditor
      value={data}
      onChange={(data) => setData(data)}
    />
  )
}
```

## License

MIT © [caminkunick](https://github.com/caminkunick)
