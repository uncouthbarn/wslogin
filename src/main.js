var window          = require('global/window')
var document        = require('global/document')
var mainLoop        = require('main-loop')
var h               = require('virtual-dom/h')
var edit            = require('edit')
var favicon         =  document.createElement('link')
var bootstrap       =  document.createElement('link')
var charset         =  document.createElement('meta')
var title           = document.createElement('title')
var bootstrapLink   = 'css/bootstrap.min.css';

title.textContent   = 'login';

charset.setAttribute(  'charset' ,         'utf-8'  )
favicon.setAttribute(  'rel'     ,  'shortcut icon' )
favicon.setAttribute(  'href'    ,   '/favicon.ico' )
favicon.setAttribute(  'type'    ,      'image/ico' )
bootstrap.setAttribute('rel'     ,     'stylesheet' )
bootstrap.setAttribute('type'    ,     'text/css'   )
bootstrap.setAttribute('href'    ,     bootstrapLink)

document.head.appendChild(charset)
document.head.appendChild(favicon)
document.head.appendChild(title)
document.head.appendChild(bootstrap)


var ws = new WebSocket('ws://localhost:3000');
ws.onopen = function(e) {
  ws.send('status:::connected to auth page');
}
ws.onmessage = function(e){
  console.log(e.data)
};


// initial state
// =======
var state = {
  email: '',
  password: '',
  login:{
    email:'',
    password:''
  }
}


function render (state) {
  return h('.row',[
    h('.container-fluid',[
      h('.col-xl-3.col-lg-3.col-md-3.col-sm-3.col.col-xs-3',[
        h('h1', 'login')
      ]),
      h('.col-xl-9.col-lg-9.col-md-9.col-sm-9.col.col-xs-9',[
        h('form.form-horizontal',[
          h('.form-group',[
            h('label.control-label.col-xl-2.col-lg-2.col-md-2.col-sm-2.col.col-xs-2', 'email'),
            h('.col-xl-10.col-lg-10.col-md-10.col-sm-10.col.col-xs-10',[
              h('input.form-control',{
                type:'email',
                placeholder:'email',
                oninput:function(e){
                  state.login.email = e.target.value
                }
              })
            ])
          ]),
          h('.form-group',[
            h('label.control-label.col-xl-2.col-lg-2.col-md-2.col-sm-2.col.col-xs-2', 'password'),
            h('.col-xl-10.col-lg-10.col-md-10.col-sm-10.col.col-xs-10',[
              h('input.form-control',{
                type:'password',
                placeholder:'password',
                oninput:function(e){
                  state.login.password = e.target.value
                }
              })
            ])
          ]),
          h('.form-group',[
            h('label.control-label.col-xl-2.col-lg-2.col-md-2.col-sm-2.col.col-xs-2', ' '),
            h('.col-xl-10.col-lg-10.col-md-10.col-sm-10.col.col-xs-10',[
              h('a.btn.btn-primary.btn-block',{
                onclick: function(e){
                  ws.send('login:::'+JSON.stringify(state.login))
                  console.log(state.login)
                }
              },'submit')
            ])
          ])
        ])
      ])
    ])
  ])
}


var loop = mainLoop(state, render, {
  create  : require('virtual-dom/create-element'),
  diff    : require('virtual-dom/diff'),
  patch   : require('virtual-dom/patch')
});


document.body.appendChild(loop.target)

Object.observe(state, function (changes){ loop.update(state) });
