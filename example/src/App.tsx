import React, { useState } from 'react'

import {
  DataGridEditor,
  DataGridEditorData,
  DataGridEditorDefaultData
} from '@caminkunick/data-grid-editor'
import '@caminkunick/data-grid-editor/dist/index.css'
import { Box, Container } from '@mui/material'

const App = () => {
  const [data, setData] = useState<DataGridEditorData>({
    ...DataGridEditorDefaultData
  })

  return (
    <Box py={6}>
      <Container maxWidth='md'>
        <DataGridEditor value={data} onChange={(data) => setData(data)} />
      </Container>
    </Box>
  )
}

export default App
