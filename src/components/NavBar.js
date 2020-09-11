import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import GitHubIcon from '@material-ui/icons/GitHub';

export default function NavBar(props) {
  const { activePageIndex } = props

  const pages = [
    {href: '/problems', name: 'Problems'},
    {href: '/compare', name: 'Compare'},
    {href: '/standings', name: 'Standings'}
  ]

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6">
          Codeforces++
        </Typography>

        <div className="flex ml-4 space-x-2">
          {
            pages.map((page, index) =>
              <NavBarLink
                href={page.href}
                text={page.name}
                isActive={index === activePageIndex}
              />
            )
          }

          <div className="p-2">
            <Link
              href="https://github.com/alvinpiter/codeforces-plus-plus"
              color="inherit"
              target="_blank"
            >
              <GitHubIcon />
            </Link>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  )
}

function NavBarLink(props) {
  const { href, text, isActive } = props
  return (
    <div className={isActive ? 'p-2 bg-indigo-500' : 'p-2'}>
      <Link href={href} color="inherit"> {text} </Link>
    </div>
  )
}
