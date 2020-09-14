import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip'
import InfoIcon from '@material-ui/icons/Info'
import TableHead from '@material-ui/core/TableHead'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TablePaginationActions from './TablePaginationActions'
import Alert from '@material-ui/lab/Alert'

function getProblemComparator(field, order) {
  if (field === 'id') {
    const ascComparator = (a, b) => {
      if (a.contestID !== b.contestID)
        return a.contestID - b.contestID

      if (a.index < b.index)
        return -1
      else
        return 1
    }

    if (order === "asc")
      return (a, b) => ascComparator(a, b)
    else
      return (a, b) => -ascComparator(a, b)
  } else {
    //field is either rating or solvedCount
    const ascComparator = (a, b) => a[field] - b[field]

    if (order === "asc")
      return (a, b) => ascComparator(a, b)
    else
      return (a, b) => -ascComparator(a, b)
  }
}

function ProblemTableHeader(props) {
  const { headers, order, orderBy, onSortRequest } = props

  return (
    <TableHead>
      <TableRow>
        {
          headers.map(header => {
            if (header.sortable) {
              return (
                <TableCell key={header.field}>
                  <TableSortLabel
                    active={orderBy === header.field}
                    direction={orderBy === header.field ? order : 'desc'}
                    onClick={() => onSortRequest(header.field)}
                  >
                    {header.name}
                  </TableSortLabel>
                </TableCell>
              )
            } else {
              return (
                <TableCell key={header.field}>
                  {header.name}
                </TableCell>
              )
            }
          })
        }
      </TableRow>
    </TableHead>
  )
}

export default function ProblemTable(props) {
  const { rows, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = props

  const [hideProblemTags, setHideProblemTags] = useState(false)
  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState('id')

  const handleHideProblemTags = (event) => {
    setHideProblemTags(!hideProblemTags)
  }

  const onSortRequest = (field) => {
    if (field === orderBy) {
      if (order === "asc")
        setOrder("desc")
      else
        setOrder("asc")
    } else {
      setOrder("desc")
      setOrderBy(field)
    }
  }

  const headers = [
    {field: 'id', name: 'ID', sortable: true},
    {field: 'name', name: 'Name', sortable: false},
    {field: 'rating', name: 'Rating', sortable: true},
    {field: 'solvedCount', name: 'SolvedCount', sortable: true},
    {field: 'tags', name: 'Tags', sortable: false}
  ]

  if (rows.length === 0) {
    return (
      <Alert severity="warning"> No problem found </Alert>
    )
  } else {
    const getRowBackgroundColor = (metadata) => {
      if (metadata === undefined)
        return ""

      const { state } = metadata
      if (state === -1)
        return "bg-red-200"
      else if (state === 1)
        return "bg-green-200"
      else
        return ""
    }

    let renderedRows = rows.slice()
    renderedRows.sort(getProblemComparator(orderBy, order))

    return (
      <div>
        <div className="flex justify-end">
          <FormControlLabel
            control={<Checkbox checked={hideProblemTags} onChange={handleHideProblemTags} />}
            label="Hide problem tags"
          />
        </div>
        <TableContainer component={Paper}>
          <Table size="small">
            <ProblemTableHeader
              headers={headers}
              order={order}
              orderBy={orderBy}
              onSortRequest={onSortRequest}
            />
            <TableBody>
              {(rowsPerPage > 0
                ? renderedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : renderedRows
              ).map((row) => (
                <TableRow key={row.id} className={getRowBackgroundColor(row.metadata)}>
                  <TableCell size="small">
                    <Link href={row.url} underline="always">{row.id}</Link>
                    {
                      row.metadata && row.metadata.state !== 0 && row.metadata.submittedProblemID !== row.id &&
                      <Tooltip title={`Submitted through ${row.metadata.submittedProblemID}`}>
                        <InfoIcon style={{fontSize: 16}}/>
                      </Tooltip>
                    }
                  </TableCell>
                  <TableCell>
                    <Link href={row.url} underline="always">{row.name}</Link>
                  </TableCell>
                  <TableCell>
                    {row.rating}
                  </TableCell>
                  <TableCell>
                    {row.solvedCount}
                  </TableCell>
                  {
                    !hideProblemTags &&
                    <TableCell>
                      <div className="space-x-1 leading-6">
                        {
                          row.tags.map(tag => <span key={tag} className="bg-gray-300 rounded-full p-1 text-xs"> {tag} </span>)
                        }
                      </div>
                    </TableCell>
                  }
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[25, 50, 100, { label: 'All', value: -1 }]}
                  colSpan={5}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    )
  }
}
