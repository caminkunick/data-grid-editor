import { GridCellEditCommitParams, GridColumns } from '@mui/x-data-grid'
import update from 'react-addons-update'
import { genKey } from './gen.key'

export type DataGridRowType = { [key: string]: string } & { id: string }
export type DataGridValues = {
  rows: DataGridRowType[]
  columns: GridColumns
}

export class DataGridController {
  rows: DataGridRowType[] = []
  columns: GridColumns = []

  constructor(data?: DataGridValues) {
    if (data) {
      this.rows = data.rows
      this.columns = data.columns
    }
  }

  data = (): DataGridValues => {
    return { rows: this.rows, columns: this.columns }
  }

  row = {
    add: (): void => {
      this.rows = this.rows.concat({
        id: genKey()
      })
    },
    change: (params: GridCellEditCommitParams) => {
      const index = this.rows.findIndex((row) => row.id === params.id)
      this.rows = update(this.rows, {
        [index]: { $merge: { [params.field]: params.value } }
      })
    },
    insert: (index: number) => {
      if (index > -1) {
        let newRows = JSON.parse(JSON.stringify(this.rows))
        newRows.splice(index, 0, { id: genKey() })
        this.rows = newRows
      }
    },
    remove: (ids: string[]) => {
      this.rows = this.rows.filter((row) => !ids.includes(row.id))
    }
  }

  column = {
    add: () => {
      this.columns = this.columns.concat({
        field: genKey(),
        headerName: `Column ${this.columns.length + 1}`,
        width: 160
      })
    },
    insert: (index: number) => {
      this.columns.splice(index, 0, {
        field: genKey(),
        headerName: `Column ${index + 0.5}`,
        width: 160
      })
    },
    change: (index: number, field: string, value: number | string) => {
      this.columns = update(this.columns, {
        [index]: { $merge: { [field]: value } }
      })
    },
    remove: (index: number) => {
      const field = this.columns[index].field
      this.columns.splice(index, 1)
      this.rows = this.rows.map((row) => {
        if (row[field]) {
          delete row[field]
        }
        return row
      })
    }
  }
}
