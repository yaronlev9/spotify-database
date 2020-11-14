import React, { useRef, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {NavLink} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black'
  },
  search: {
    position: 'relative',
    marginLeft: '100px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'black',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar(props) {
  const value = useRef('');
  const classes = useStyles();
  const [search, setSearch] = useState();

  function changeSearch(value){
    setSearch(value);
    props.onChange(value)
  }

  function resetValue(){
    setSearch('');
    props.refresh(); 
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ background: '#696969' }}>
        <Toolbar>
          <Typography  variant="h6" noWrap>
            <NavLink to="/" className = 'titleBar' style={{color: 'green', 'textDecoration': 'none', backgroundColor: 'black'}}><span style={{fontSize:"20"}}>SPOTIFY</span></NavLink>
          </Typography>
          {
        props.isLogged &&
        <div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              ref={value}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={search}
              onChange={(e) => changeSearch(e.target.value)}
            />
          </div>
          <Typography variant="h6" noWrap>
        <NavLink className= "homeBar" to="/home" style={{color: 'grey', 'textDecoration': 'none'}} activeStyle={{color: 'white'}} onClick={resetValue}>HOME</NavLink>
          </Typography>
        <Typography variant="h6" noWrap>
        <NavLink className= "loginBar" to="/" style={{color: 'grey', 'textDecoration': 'none'}} activeStyle={{color: 'white'}} onClick={props.removeToken}>Logout</NavLink>
          </Typography>
        </div>
        }
        {
        !props.isLogged && 
        <Typography variant="h6" noWrap>
            <NavLink className= "loginBar" to="/login" style={{color: 'grey', 'textDecoration': 'none'}} activeStyle={{color: 'white'}}>Login</NavLink>
          </Typography>
        }
        </Toolbar>
      </AppBar>
    </div>
  );
}
