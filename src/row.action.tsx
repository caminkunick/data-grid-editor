import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { useDGE } from './context'
import { DataGridController } from './data.grid.controller'
import { SmallButton } from './small.button'

export const RowAction = () => {
  const { selection, setSelection, data, setData } = useDGE()

  const handleAddRow = () => {
    const newData = new DataGridController(data)
    newData.row.add()
    setData(newData.data())
  }
  const handleInsert = () => {
    if (selection.length === 1) {
      const index = data.rows.findIndex((row) => row.id === selection[0])
      const newData = new DataGridController(data)
      newData.row.insert(index)
      setData(newData.data())
    }
  }
  const handleRemoveSelection = () => {
    const label = 'Do you want to remove selected row(s)?'
    if (confirm(label)) {
      const newData = new DataGridController(data)
      newData.row.remove(selection)
      setData(newData.data())
      setSelection([])
    }
  }

  return (
    <Box flex={1}>
      <Typography
        paragraph
        variant='caption'
        sx={{ mb: 0.5 }}
        color='textSecondary'
      >
        Row
      </Typography>
      <Stack direction='row' spacing={1}>
        <SmallButton icon={['fas', 'plus']} onClick={handleAddRow}>
          Add
        </SmallButton>
        {selection.length === 1 && (
          <SmallButton
            icon={['fas', 'arrow-right']}
            onClick={handleInsert}
          >
            Insert
          </SmallButton>
        )}
        {selection.length > 0 && (
          <SmallButton
            color='error'
            icon={['fas', 'trash']}
            onClick={handleRemoveSelection}
          >
            Remove
          </SmallButton>
        )}
      </Stack>
    </Box>
  )
}
