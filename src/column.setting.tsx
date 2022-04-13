import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton, Stack, TextField } from '@mui/material'
import { GridEnrichedColDef } from '@mui/x-data-grid'
import * as React from 'react'
import { ActionBox } from './action.box'
import { useDGE } from './context'
import { DataGridController } from './data.grid.controller'
import { SmallButton } from './small.button'

export const ColumnSetting = ({
  column,
  index,
  onExit
}: {
  column: GridEnrichedColDef
  index: number
  onExit: () => void
}) => {
  const { data, setData, onChange } = useDGE()

  const handleColumnChange =
    (index: number, field: string) =>
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      const newData = new DataGridController(data)
      newData.column.change(index, field, value)
      setData(newData.data())
      onChange?.(newData.data())
    }
  const handleRemoveColumn = (index: number) => () => {
    const label = 'Do you want to remove this column?'
    if (confirm(label)) {
      const newData = new DataGridController(data)
      newData.column.remove(index)
      setData(newData.data())
      onChange?.(newData.data())
    }
  }
  const handleInsertColumn = () => {
    const newData = new DataGridController(data)
    newData.column.insert(index)
    setData(newData.data())
    onChange?.(newData.data())
  }

  return (
    <ActionBox sx={{ pt: 2 }}>
      <Stack direction='row' spacing={1} alignItems='center'>
        <IconButton size='small' onClick={onExit}>
          <FontAwesomeIcon size='xs' icon={['fas', 'times']} />
        </IconButton>
        <TextField
          label='Name'
          size='small'
          value={column.headerName || ''}
          onChange={handleColumnChange(index, 'headerName')}
        />
        <TextField
          label='Width'
          size='small'
          type='number'
          value={column.width || 160}
          onChange={handleColumnChange(index, 'width')}
        />
        <SmallButton
          icon={['fas', 'arrow-right']}
          onClick={handleInsertColumn}
        >
          Insert
        </SmallButton>
        <Box flex={1} />
        <IconButton
          size='small'
          color='error'
          onClick={handleRemoveColumn(index)}
        >
          <FontAwesomeIcon size='xs' icon={['fas', 'trash']} />
        </IconButton>
      </Stack>
    </ActionBox>
  )
}
