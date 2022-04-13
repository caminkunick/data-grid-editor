import {
  DataGrid,
  GridCellEditCommitParams,
  GridColumnHeaderParams
} from '@mui/x-data-grid'
import * as React from 'react'
import { ActionBox } from './action.box'
import {
  DataGridEditorContext,
  DataGridEditorData,
  DataGridEditorProps,
  defaultData
} from './context'
import { Root } from './root'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { DataGridController } from './data.grid.controller'
import { Box } from '@mui/material'
import { RowAction } from './row.action'
import { ColumnAction } from './column.action'
import { ColumnSetting } from './column.setting'

library.add(fas)

export {
  DataGridEditorData,
  defaultData as DataGridEditorDefaultData
} from './context'
export const DataGridEditor = (props: DataGridEditorProps) => {
  const [data, setData] = React.useState<DataGridEditorData>(defaultData)
  const [selection, setSelection] = React.useState<string[]>([])
  const [columnSelect, setColumnSelect] = React.useState<string>('')

  const handleSelectionChange = (selectionModel: string[]) =>
    setSelection(selectionModel)
  const handleCellEditCommit = (
    params: GridCellEditCommitParams,
    event: any
  ) => {
    event?.persist?.()
    const newData = new DataGridController(data)
    newData.row.change(params)
    setData(newData.data())
    props.onChange?.(newData.data())
  }
  const handleColumnHeaderSelect = (params: GridColumnHeaderParams) => {
    setColumnSelect(params.field)
  }

  React.useEffect(() => {
    if (props.value && JSON.stringify(props.value) !== JSON.stringify(data)) {
      setData(props.value)
    }
  }, [props.value])

  return (
    <DataGridEditorContext.Provider
      value={{ ...props, data, setData, selection, setSelection }}
    >
      <Root>
        <ActionBox display={'flex'}>
          <RowAction />
          <Box
            sx={{
              mx: 2,
              borderLeft: 'solid 1px',
              borderLeftColor: 'grey.300'
            }}
          />
          <ColumnAction />
        </ActionBox>
        {data.columns.map(
          (column, index) =>
            columnSelect === column.field && (
              <ColumnSetting
                index={index}
                column={column}
                onExit={() => setColumnSelect('')}
                key={column.field}
              />
            )
        )}
        <DataGrid
          rows={data.rows}
          columns={data.columns.map((column) => ({
            ...column,
            editable: true,
            sortable: false
          }))}
          autoHeight
          checkboxSelection
          selectionModel={selection}
          onSelectionModelChange={handleSelectionChange}
          disableSelectionOnClick
          hideFooter
          onCellEditCommit={handleCellEditCommit}
          onColumnHeaderClick={handleColumnHeaderSelect}
          disableColumnMenu
        />
      </Root>
    </DataGridEditorContext.Provider>
  )
}
