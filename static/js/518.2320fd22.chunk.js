"use strict";(self.webpackChunksocial_network_ts=self.webpackChunksocial_network_ts||[]).push([[518],{2518:function(e,n,r){r.r(n),r.d(n,{default:function(){return W}});var t=r(5671),o=r(3144),u=r(136),s=r(5716),i=r(2791),a=r(364),l=r(5987),c=r(885),f="Paginator_paginator__vr0UM",p="Paginator_selectedPage__op-V6",g=r(184),h=function(e){for(var n=e.totalItemsCount,r=e.pageSize,t=e.currentPage,o=e.onPageChanged,u=e.portionSize,s=void 0===u?10:u,a=Math.ceil(n/r),l=[],h=1;h<=a;h++)l.push(h);var d=Math.ceil(a/s),v=(0,i.useState)(1),w=(0,c.Z)(v,2),m=w[0],P=w[1],y=(m-1)*s+1,_=m*s;return(0,g.jsxs)("div",{className:f,children:[m>1&&(0,g.jsx)("button",{onClick:function(){P(m-1)},children:"PREW"}),l.filter((function(e){return e>=y&&e<=_})).map((function(e){return(0,g.jsx)("span",{className:t===e?p:"",onClick:function(n){o(e)},children:e},e)})),d>m&&(0,g.jsx)("button",{onClick:function(){P(m+1)},children:"NEXT"})]})},d="User_user__ywuuy",v="User_userPhoto__VW6pm",w="User_unFollowBtn__5b6t0",m="User_followBtn__bbTkD",P=r(5557),y=r(3504),_=function(e){var n=e.user,r=e.followingInProgress,t=e.unfollow,o=e.follow;return(0,g.jsxs)("div",{className:d,children:[(0,g.jsx)("div",{children:(0,g.jsx)(y.OL,{to:"/profile/"+n.id,children:(0,g.jsx)("img",{src:null!==n.photos.small?n.photos.small:P,className:v,alt:"userPhoto"})})}),(0,g.jsx)("span",{children:n.name}),(0,g.jsx)("span",{children:n.status}),(0,g.jsx)("div",{children:n.followed?(0,g.jsx)("button",{className:w,disabled:r.some((function(e){return e===n.id})),onClick:function(){t(n.id)},children:"unFollow"}):(0,g.jsx)("button",{className:m,disabled:r.some((function(e){return e===n.id})),onClick:function(){o(n.id)},children:"Follow"})})]})},C="Users_usersPage__dWc9b",j="Users_usersContainer__cTge6",x="Users_users__au+hV",k=["totalUsersCount","pageSize","currentPage","onPageChanged","unfollow","follow","followingInProgress","users"],b=function(e){var n=e.totalUsersCount,r=e.pageSize,t=e.currentPage,o=e.onPageChanged,u=e.unfollow,s=e.follow,i=e.followingInProgress,a=e.users;(0,l.Z)(e,k);return(0,g.jsxs)("div",{className:C,children:[(0,g.jsx)(h,{totalItemsCount:n,pageSize:r,currentPage:t,onPageChanged:o,portionSize:10}),(0,g.jsx)("div",{className:j,children:(0,g.jsx)("div",{className:x,children:a.map((function(e){return(0,g.jsx)(_,{user:e,unfollow:u,follow:s,followingInProgress:i},e.id)}))})})]})},U=r(4041),z=r(6674),S=r(7781),N="NOT_FOUND";var F=function(e,n){return e===n};function I(e,n){var r="object"===typeof n?n:{equalityCheck:n},t=r.equalityCheck,o=void 0===t?F:t,u=r.maxSize,s=void 0===u?1:u,i=r.resultEqualityCheck,a=function(e){return function(n,r){if(null===n||null===r||n.length!==r.length)return!1;for(var t=n.length,o=0;o<t;o++)if(!e(n[o],r[o]))return!1;return!0}}(o),l=1===s?function(e){var n;return{get:function(r){return n&&e(n.key,r)?n.value:N},put:function(e,r){n={key:e,value:r}},getEntries:function(){return n?[n]:[]},clear:function(){n=void 0}}}(a):function(e,n){var r=[];function t(e){var t=r.findIndex((function(r){return n(e,r.key)}));if(t>-1){var o=r[t];return t>0&&(r.splice(t,1),r.unshift(o)),o.value}return N}return{get:t,put:function(n,o){t(n)===N&&(r.unshift({key:n,value:o}),r.length>e&&r.pop())},getEntries:function(){return r},clear:function(){r=[]}}}(s,a);function c(){var n=l.get(arguments);if(n===N){if(n=e.apply(null,arguments),i){var r=l.getEntries(),t=r.find((function(e){return i(e.value,n)}));t&&(n=t.value)}l.put(arguments,n)}return n}return c.clearCache=function(){return l.clear()},c}function E(e){var n=Array.isArray(e[0])?e[0]:e;if(!n.every((function(e){return"function"===typeof e}))){var r=n.map((function(e){return"function"===typeof e?"function "+(e.name||"unnamed")+"()":typeof e})).join(", ");throw new Error("createSelector expects all input-selectors to be functions, but received the following types: ["+r+"]")}return n}function Z(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),t=1;t<n;t++)r[t-1]=arguments[t];var o=function(){for(var n=arguments.length,t=new Array(n),o=0;o<n;o++)t[o]=arguments[o];var u,s=0,i={memoizeOptions:void 0},a=t.pop();if("object"===typeof a&&(i=a,a=t.pop()),"function"!==typeof a)throw new Error("createSelector expects an output function after the inputs, but received: ["+typeof a+"]");var l=i,c=l.memoizeOptions,f=void 0===c?r:c,p=Array.isArray(f)?f:[f],g=E(t),h=e.apply(void 0,[function(){return s++,a.apply(null,arguments)}].concat(p)),d=e((function(){for(var e=[],n=g.length,r=0;r<n;r++)e.push(g[r].apply(null,arguments));return u=h.apply(null,e)}));return Object.assign(d,{resultFunc:a,memoizedResultFunc:h,dependencies:g,lastResult:function(){return u},recomputations:function(){return s},resetRecomputations:function(){return s=0}}),d};return o}var q=Z(I),A=q((function(e){return e.usersPage.users}),(function(e){return e.filter((function(e){return!0}))})),O=function(e){return e.usersPage.pageSize},D=function(e){return e.usersPage.totalUsersCount},M=function(e){return e.usersPage.page},R=function(e){return e.usersPage.isFetching},T=function(e){return e.usersPage.followingInProgress},V=function(e){(0,u.Z)(r,e);var n=(0,s.Z)(r);function r(){var e;(0,t.Z)(this,r);for(var o=arguments.length,u=new Array(o),s=0;s<o;s++)u[s]=arguments[s];return(e=n.call.apply(n,[this].concat(u))).onPageChanged=function(n){var r=e.props;(0,r.requestUsers)(n,r.pageSize)},e}return(0,o.Z)(r,[{key:"componentDidMount",value:function(){var e=this.props;(0,e.requestUsers)(e.page,e.pageSize)}},{key:"render",value:function(){return(0,g.jsxs)(g.Fragment,{children:[this.props.isFetching?(0,g.jsx)(z.p,{}):null,(0,g.jsx)(b,{totalUsersCount:this.props.totalUsersCount,pageSize:this.props.pageSize,currentPage:this.props.page,onPageChanged:this.onPageChanged,users:this.props.users,unfollow:this.props.unfollow,follow:this.props.follow,followingInProgress:this.props.followingInProgress})]})}}]),r}(i.Component),W=(0,S.qC)((0,a.$j)((function(e){return{users:A(e),pageSize:O(e),totalUsersCount:D(e),page:M(e),isFetching:R(e),followingInProgress:T(e)}}),{follow:U.ZN,unfollow:U.fv,setCurrentPage:U.D4,toggleFollowingProgress:U.ZH,requestUsers:U.D7}))(V)},5557:function(e,n,r){e.exports=r.p+"static/media/flat-face-icon-23.00d92f05e4fec182b3f6.png"}}]);
//# sourceMappingURL=518.2320fd22.chunk.js.map