import { Box, Stack, Typography } from '@mui/material'
import * as React from 'react'
import { useDGE } from './context'
import { DataGridController } from './data.grid.controller'
import { SmallButton } from './small.button'

export const ColumnAction = () => {
  const { data, setData, onChange } = useDGE()

  const handleAddColumn = () => {
    const newData = new DataGridController(data)
    newData.column.add()
    setData(newData.data())
    onChange?.(newData.data())
  }

  return (
    <Box flex={1}>
      <Typography
        variant='caption'
        color='textSecondary'
        paragraph
        sx={{ mb: 0.5 }}
      >
        Column
      </Typography>
      <Stack direction={'row'} spacing={1}>
        <SmallButton icon={['fas', 'plus']} onClick={handleAddColumn}>
          Add
        </SmallButton>
      </Stack>
    </Box>
  )
}
