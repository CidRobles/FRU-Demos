(window.__LOADABLE_LOADED_CHUNKS__=window.__LOADABLE_LOADED_CHUNKS__||[]).push([[2],{372:function(e,t,i){"use strict";i.r(t);i(1);var a=i(2),s=i(345),c=i(371),n=i(0);t.default=Object(a.connect)(({state:e})=>{const t=e.source.get(e.router.link);return Object(n.jsxs)(r,{children:[t.isTaxonomy&&Object(n.jsxs)(o,{children:[t.taxonomy,":"," ",Object(n.jsx)("b",{children:Object(a.decode)(e.source[t.taxonomy][t.id].name)})]}),t.isAuthor&&Object(n.jsxs)(o,{children:["Author: ",Object(n.jsx)("b",{children:Object(a.decode)(e.source.author[t.id].name)})]}),t.items.map(({type:t,id:i})=>{const a=e.source[t][i];return Object(n.jsx)(s.a,{item:a},a.id)}),Object(n.jsx)(c.a,{})]})});const r=Object(a.styled)("section",{target:"exiu6z11"})({name:"1uk7fhg",styles:"width:800px;margin:0;padding:24px;list-style:none"}),o=Object(a.styled)("h3",{target:"exiu6z10"})({name:"eigqg2",styles:"font-weight:300;text-transform:capitalize;color:rgba(12, 17, 43, 0.9)"})},374:function(e,t,i){"use strict";i.r(t);var a=i(1),s=i(2),c=i(9),n=i(11),r=i(0);var o=Object(s.connect)(({link:e,title:t,image:i})=>Object(r.jsx)(d,{children:Object(r.jsxs)(c.a,{link:e,children:[i&&Object(r.jsx)(n.a,{src:i}),Object(r.jsx)(l,{dangerouslySetInnerHTML:{__html:t}})]})}));const l=Object(s.styled)("h1",{target:"e638tw12"})({name:"k9rgms",styles:"font-size:2rem;color:#403D39;margin:0;padding-top:24px;padding-bottom:8px;box-sizing:border-box"}),d=Object(s.styled)("article",{target:"e638tw11"})({name:"1b4p5h5",styles:"border-bottom:4px dashed"});Object(s.styled)("img",{target:"e638tw10"})({name:"1ovdzgw",styles:"margin:0;margin-top:24px;margin-bottom:8px"});var m=Object(s.connect)(({state:e,actions:t})=>{const{next:i,previous:s}=e.source.get(e.router.link);return Object(a.useEffect)(()=>{i&&t.source.fetch(i)},[]),Object(r.jsxs)("div",{children:[i&&Object(r.jsx)(c.a,{link:i,children:Object(r.jsx)(x,{children:"← Older posts"})}),s&&i&&" - ",s&&Object(r.jsx)(c.a,{link:s,children:Object(r.jsx)(x,{children:"Newer posts →"})})]})});const x=Object(s.styled)("em",{target:"e1d1sgm80"})({name:"vxgo1h",styles:"display:inline-block;margin-top:16px"});t.default=Object(s.connect)(({state:e})=>{const t=e.source.get(e.router.link);return Object(r.jsxs)(j,{children:[t.items.map(({type:t,id:i})=>{const a=e.source[t][i],s=a.acf.vp_video_image?a.acf.vp_video_image.sizes.thumbnail:"",{acf:c,link:n,title:{rendered:l},content:{rendered:d}}=a;return Object(r.jsx)(o,{link:n,title:l,image:s},a.id)}),Object(r.jsx)(m,{})]})});const j=Object(s.styled)("section",{target:"ehhnn9h1"})({name:"1uk7fhg",styles:"width:800px;margin:0;padding:24px;list-style:none"});Object(s.styled)("h3",{target:"ehhnn9h0"})({name:"eigqg2",styles:"font-weight:300;text-transform:capitalize;color:rgba(12, 17, 43, 0.9)"})},375:function(e,t,i){"use strict";i.r(t);var a=i(1),s=i(2),c=i(9),n=i(4),r=i.n(n),o=i(174),l=i(53),d=i(0);var m=Object(s.connect)(({itemId:e,link:t,title:i,publicationDate:a})=>Object(d.jsxs)(o.a,{children:[Object(d.jsxs)(c.a,{link:t,children:[Object(d.jsx)("div",{className:"meta-data full-meta-data",children:Object(d.jsx)("span",{className:"date",children:r()(a).format("MMMM D, YYYY")})}),Object(d.jsx)("h3",{dangerouslySetInnerHTML:{__html:i}})]}),Object(d.jsxs)("div",{className:"post-bottom",children:[Object(d.jsx)("div",{className:"pr-sub-title"}),Object(d.jsxs)("div",{className:"share-with",children:[Object(d.jsx)("div",{className:"share-arrow",children:Object(d.jsx)("span",{children:"Share"})}),Object(d.jsx)(l.a,{itemId:e,itemUrl:t,itemTitle:i})]})]})]}));var x=Object(s.connect)(({state:e,actions:t})=>{const{next:i,previous:s}=e.source.get(e.router.link);return Object(a.useEffect)(()=>{i&&t.source.fetch(i)},[]),Object(d.jsxs)("div",{children:[i&&Object(d.jsx)(c.a,{link:i,children:Object(d.jsx)(j,{children:"← Older posts"})}),s&&i&&" - ",s&&Object(d.jsx)(c.a,{link:s,children:Object(d.jsx)(j,{children:"Newer posts →"})})]})});const j=Object(s.styled)("em",{target:"e1j19vgr0"})({name:"vxgo1h",styles:"display:inline-block;margin-top:16px"});var p=i(175),h=i(131),b=i(72),O=i(105);t.default=Object(s.connect)(({state:e,libraries:t})=>{const i=e.source.get(e.router.link);return Object(d.jsxs)(p.a,{className:"container",children:[Object(d.jsx)("h1",{children:"JDC Press releases"}),Object(d.jsx)(O.a,{children:Object(d.jsx)(b.a,{pageType:"press-releases"})}),Object(d.jsxs)("div",{className:"post-list-view",children:[Object(d.jsx)("div",{className:"list-items",children:Object(d.jsxs)("div",{className:"list-tabs",children:[Object(d.jsx)("div",{className:"list-tabs-content",children:i.items.map(({type:t,id:i})=>{const a=e.source[t][i],s=a.blocks[0].attrs.data.publication_date,{link:c,title:{rendered:n}}=a;return Object(d.jsx)(m,{itemId:a.id,link:c,title:n,publicationDate:s},"press-release-"+a.id)})}),Object(d.jsx)("div",{className:"more-link text-center",children:Object(d.jsx)(c.a,{className:"button with-arrow arrow-down",link:"",children:Object(d.jsx)("span",{children:"Load More"})})})]})}),Object(d.jsx)(h.a,{})]}),Object(d.jsx)(x,{})]})})},376:function(e,t,i){"use strict";i.r(t);var a=i(1),s=i(2),c=(i(28),i(9)),n=(i(11),i(4)),r=i.n(n),o=i(482),l=i(130),d=i(53),m=i(0);var x=Object(s.connect)(({itemId:e,link:t,date:i,description:a,authorName:s,topImage:n,title:x,classForHideExtra:j})=>Object(m.jsxs)(o.a,{className:j,children:[Object(m.jsxs)("div",{className:"voice-data",children:[Object(m.jsxs)(c.a,{link:t,children:[Object(m.jsx)("div",{className:"meta-data full-meta-data",children:Object(m.jsx)("span",{className:"date",children:r()(i).format("MMMM D, YYYY")})}),Object(m.jsx)("h3",{dangerouslySetInnerHTML:{__html:x}})]}),Object(m.jsx)("div",{className:"voices-description",children:Object(m.jsx)("p",{children:a})}),Object(m.jsxs)("div",{className:"post-bottom",children:[s&&Object(m.jsxs)("div",{className:"pr-sub-title",children:["by ",s]}),Object(m.jsxs)("div",{className:"share-with",children:[Object(m.jsx)("div",{className:"share-arrow",children:Object(m.jsx)("span",{children:"Share"})}),Object(m.jsx)(d.a,{itemId:e,itemUrl:t,itemTitle:x})]})]})]}),Object(m.jsx)("div",{className:"voice-image",children:Object(m.jsx)(c.a,{link:t,children:Object(m.jsx)(l.a,{parentId:n})})})]})),j=i(483),p=i(72),h=i(105),b=i(176);Object(s.connect)(({state:e,actions:t})=>{const{next:i,previous:s}=e.source.get(e.router.link);return Object(a.useEffect)(()=>{i&&t.source.fetch(i)},[]),Object(m.jsxs)(O,{children:[i&&Object(m.jsx)("div",{className:"more-link text-center",children:Object(m.jsx)(c.a,{className:"button with-arrow",link:i,children:Object(m.jsx)("span",{children:"Load Next"})})}),s&&Object(m.jsx)("div",{className:"more-link text-center",children:Object(m.jsx)(c.a,{className:"button with-arrow with-arrow-before",link:s,children:Object(m.jsx)("span",{children:"Load Previous"})})})]})});const O=Object(s.styled)("div",{target:"e18gu4121"})("");Object(s.styled)("span",{target:"e18gu4120"})({name:"1r5gb7q",styles:"display:inline-block"});var g=i(19),u=i.n(g);t.default=Object(s.connect)(({state:e,libraries:t})=>{const i=e.source.get(e.router.link);let a="",n="",r="",o="",l=1;return Object(m.jsxs)(j.a,{className:"container",children:[i.isTaxonomy&&Object(m.jsx)("div",{className:"category-title",children:Object(m.jsx)("span",{children:i.taxonomy})}),i.isTaxonomy&&Object(m.jsxs)("h1",{children:[" ",Object(s.decode)(e.source[i.taxonomy][i.id].name)]}),Object(m.jsx)(h.a,{children:Object(m.jsx)(p.a,{pageType:"stories"})}),Object(m.jsx)("div",{className:"post-list-view",children:Object(m.jsx)("div",{className:"list-items",children:Object(m.jsx)("div",{className:"list-tabs",children:Object(m.jsx)("div",{className:"list-tabs-content",children:i.items.map(({type:t,id:i})=>{const s=e.source[t][i];let c="";l>10&&(c="hide-list-item"),l++,s.blocks.map(e=>{"acf/our-story"==e.blockName&&(a=e.attrs.data.publication_date,n=e.attrs.data.post_description,r=e.attrs.data.author_name,o=e.attrs.data.top_photo)});const{link:d,title:{rendered:j}}=s;return Object(m.jsx)(x,{itemId:s.id,link:d,date:a,description:n,authorName:r,topImage:o,title:j,classForHideExtra:c},"jdc-collection-"+s.id)})})})})}),i.items.length>5&&Object(m.jsx)(b.a,{}),Object(m.jsxs)("div",{className:"post-share share",children:[Object(m.jsx)("h3",{children:"Share This Collection With Your Friends And Family"}),Object(m.jsx)(d.a,{itemId:i.id,itemUrl:e.router.link,itemTitle:Object(s.decode)(e.source[i.taxonomy][i.id].name)})]}),Object(m.jsxs)("div",{className:"voice-form-main",children:[Object(m.jsx)("h3",{children:"Sign Up for Updates from the Front Lines"}),Object(m.jsx)("div",{className:"voice-subscribe-form",children:Object(m.jsx)(u.a,{portalId:"2550774",formId:"c2c07e9a-d4de-4d48-b121-6b418a43bba4",loading:Object(m.jsx)("div",{children:"Loading..."})})})]}),Object(m.jsx)("div",{className:"back-to-jdc-collections",children:Object(m.jsx)(c.a,{link:"/jdc-collections/",className:"link-with-arrow",children:Object(m.jsx)("span",{children:"Back to  JDC Collection"})})})]})})},377:function(e,t,i){"use strict";i.r(t);var a=i(1),s=i(2),c=(i(28),i(9)),n=(i(11),i(4)),r=i.n(n),o=i(482),l=i(130),d=i(53),m=i(0);var x=Object(s.connect)(({itemId:e,link:t,date:i,description:a,authorName:s,topImage:n,title:x})=>Object(m.jsxs)(o.a,{children:[Object(m.jsxs)("div",{className:"voice-data",children:[Object(m.jsxs)(c.a,{link:t,children:[Object(m.jsx)("div",{className:"meta-data full-meta-data",children:Object(m.jsx)("span",{className:"date",children:r()(i).format("MMMM D, YYYY")})}),Object(m.jsx)("h3",{dangerouslySetInnerHTML:{__html:x}})]}),Object(m.jsx)("div",{className:"voices-description",children:Object(m.jsx)("p",{children:a})}),Object(m.jsxs)("div",{className:"post-bottom",children:[s&&Object(m.jsxs)("div",{className:"pr-sub-title",children:["by ",s]}),Object(m.jsxs)("div",{className:"share-with",children:[Object(m.jsx)("div",{className:"share-arrow",children:Object(m.jsx)("span",{children:"Share"})}),Object(m.jsx)(d.a,{itemId:e,itemUrl:t,itemTitle:x})]})]})]}),Object(m.jsx)("div",{className:"voice-image",children:Object(m.jsx)(c.a,{link:t,children:Object(m.jsx)(l.a,{parentId:n})})})]}));var j=Object(s.connect)(({state:e,actions:t})=>{const{next:i,previous:s}=e.source.get(e.router.link);return Object(a.useEffect)(()=>{i&&t.source.fetch(i)},[]),Object(m.jsxs)("div",{children:[i&&Object(m.jsx)(c.a,{link:i,children:Object(m.jsx)(p,{children:"← Older posts"})}),s&&i&&" - ",s&&Object(m.jsx)(c.a,{link:s,children:Object(m.jsx)(p,{children:"Newer posts →"})})]})});const p=Object(s.styled)("em",{target:"e5p01u10"})({name:"vxgo1h",styles:"display:inline-block;margin-top:16px"});var h=i(483),b=(i(131),i(72)),O=i(105);t.default=Object(s.connect)(({state:e,libraries:t})=>{const i=e.source.get(e.router.link);let a="",n="",r="",o="";return Object(m.jsxs)(h.a,{className:"container",children:[i.isTaxonomy&&Object(m.jsx)("div",{className:"category-title",children:Object(m.jsx)("span",{children:"JDC Voice Blog"})}),i.isTaxonomy&&Object(m.jsxs)("h1",{children:[" ",Object(s.decode)(e.source[i.taxonomy][i.id].name)]}),Object(m.jsx)(O.a,{children:Object(m.jsx)(b.a,{pageType:"voice"})}),Object(m.jsx)("div",{className:"post-list-view",children:Object(m.jsx)("div",{className:"list-items",children:Object(m.jsxs)("div",{className:"list-tabs",children:[Object(m.jsx)("div",{className:"list-tabs-content",children:i.items.map(({type:t,id:i})=>{const s=e.source[t][i];s.blocks.map(e=>{"acf/voice"==e.blockName&&(a=e.attrs.data.publication_date,n=e.attrs.data.post_description,r=e.attrs.data.author_name,o=e.attrs.data.top_photo)});const{link:c,title:{rendered:l}}=s;return Object(m.jsx)(x,{itemId:s.id,link:c,date:a,description:n,authorName:r,topImage:o,title:l},"jdc-collection-"+s.id)})}),Object(m.jsx)("div",{className:"more-link text-center",children:Object(m.jsx)(c.a,{className:"button with-arrow arrow-down",link:"",children:Object(m.jsx)("span",{children:"Load More"})})})]})})}),Object(m.jsx)(j,{})]})})},378:function(e,t,i){"use strict";i.r(t);i(1);var a=i(2),s=(i(3),i(7),i(9)),c=i(174),n=i(53),r=i(4),o=i.n(r),l=(i(130),i(0));var d=Object(a.connect)(({state:e,item:t,classForHideExtra:i})=>{const a=e=>e.replace(/\w\S*/g,(function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()})),r=t.blocks[t.blocks.length-1];return Object(l.jsxs)(c.a,{className:i,children:["acf/in-the-news"==r.blockName&&Object(l.jsxs)(s.a,{link:r.attrs.data.link_to_publication.url,target:r.attrs.data.link_to_publication.target,children:[Object(l.jsx)("div",{className:"meta-data full-meta-data",children:Object(l.jsx)("span",{className:"date",children:o()(r.attrs.data.publication_date).format("MMMM D, YYYY")})}),Object(l.jsx)("h3",{dangerouslySetInnerHTML:{__html:t.title.rendered}})]}),"acf/in-the-news"!=r.blockName&&Object(l.jsxs)(s.a,{link:t.link,children:[("acf/voice"==r.blockName||"acf/press-releases"==r.blockName||"acf/in-the-news"==r.blockName||"acf/our-story"==r.blockName)&&Object(l.jsx)("div",{className:"meta-data full-meta-data",children:Object(l.jsx)("span",{className:"date",children:o()(r.attrs.data.publication_date).format("MMMM D, YYYY")})}),"acf/video"==r.blockName&&Object(l.jsx)("div",{className:"meta-data full-meta-data",children:Object(l.jsx)("span",{className:"date",children:o()(t.date).format("MMMM D, YYYY")})}),Object(l.jsx)("h3",{dangerouslySetInnerHTML:{__html:t.title.rendered}})]}),Object(l.jsxs)("div",{className:"post-bottom",children:[Object(l.jsx)("div",{className:"pr-sub-title",children:(d=t.type,a(d.split("-").join(" ")))}),Object(l.jsxs)("div",{className:"share-with",children:[Object(l.jsx)("div",{className:"share-arrow",children:Object(l.jsx)("span",{children:"Share"})}),Object(l.jsx)(n.a,{itemId:t.id,itemUrl:t.link,itemTitle:t.title.rendered})]})]})]});var d}),m=i(175),x=i(176);t.default=Object(a.connect)(({state:e})=>{const t=e.source.get(e.router.link);let i=1;return Object(l.jsxs)(m.a,{className:"container",children:[t.isTaxonomy&&Object(l.jsx)("div",{className:"category-title",children:Object(l.jsx)("span",{children:t.title})}),t.isTaxonomy&&Object(l.jsxs)("h1",{children:[" ",Object(a.decode)(e.source[t.taxonomy][t.id].name)]}),Object(l.jsx)("div",{className:"post-list-view",children:Object(l.jsx)("div",{className:"list-items",children:Object(l.jsxs)("div",{className:"list-tabs",children:[Object(l.jsx)("div",{className:"list-tabs-content",children:t.items.map(({type:t,id:a})=>{const s=e.source[t][a];let c="";return i>10&&(c="hide-list-item"),i++,Object(l.jsx)(d,{item:s,classForHideExtra:c},s.id)})}),t.items.length>10&&Object(l.jsx)(x.a,{})]})})})]})})},482:function(e,t,i){"use strict";var a=i(34);let s;t.a=a.a.div(s||(s=(e=>e)`
  &:nth-of-type(-n+4) {
    order: -1;
  }

  display: flex;
  flex-direction: column-reverse;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 10px;
  }

  .voices-description {
    flex-grow: 1;

    @media (max-width: 767px) {
      padding-right: 25px;
    }
  }

  &:hover {
    background-color: rgba(0, 144, 166, 0.05);
  }

  &:not(:first-of-type) {
    &:after {
      content: '';
      position: absolute;
      display: block;
      left: 0;
      right: 0;
      height: 1px;
      background: rgba(0,0,0,0.15);
      top: -15px;
    }
  }

  h3 {
    font-family: "Larsseit";
    font-weight: normal;
    font-size: 22px;
    line-height: 28px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    color: #424242;
    margin-top: 7px;

    @media (min-width: 768px) {
      margin-top: 10px;
      margin-bottom: 10px;
    }

    @media (min-width: 1025px) {
      font-size: 30px;
      line-height: 36px;
    }
  }

  .date {
    font-family: "Larsseit";
    font-weight: bold;
    font-size: 18px;
    color: #424242;
    display: flex;

    @media (max-width: 1024px) {
      font-size: 16px;
    } 

    .category-name {
      &:before {
        content: '|';
        color: #00C1DE;
        margin: 0 5px;
      }

      @media (max-width: 767px) {
        display: none;
      }
    }
  }

  .pr-sub-title {
    font-family: "Larsseit";
    font-weight: bold;
    font-size: 18px;
    letter-spacing: -0.5px;
    color: #00C1DE;

    span {
      color: #424242;

      @media (max-width: 767px) {
        display: none;
      }
    }
  }

  .post-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 1025px) {
      margin-top: 15px;
      margin-bottom: 30px
    }

    .share-with {
      margin-right: -40px;
      margin-top: -15px;

      @media (max-width: 767px) {
        position: absolute;
        top: 30px;
        margin-top: 0;
        right: 13px;
      }
    }
  }

  .voice-image {
    width: 100%;

    @media (min-width: 768px) {
      width: 280px;
      min-width: 280px;
      margin-top: 15px;
      margin-bottom: 15px;
    }

    @media (min-width: 1025px) {
      width: 380px;
      min-width: 380px;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    img {
      width: 100%;
      height: auto;
    }
  }

  .voice-data {
    position: relative;

    @media (max-width: 767px) {
      padding: 10px;
      padding-right: 40px;
    }

    @media (min-width: 768px) {
      margin-top: 0;
      padding-right: 50px;
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
`))},483:function(e,t,i){"use strict";var a=i(34),s=i(22),c=i(23),n=i(24),r=i(32);let o;t.a=a.a.div(o||(o=(e=>e)`
	.category-title {
		font-family: Knockout;
		font-style: normal;
		font-size: 30px;
		text-transform: uppercase;
		margin-bottom: 10px;

		@media (max-width: 767px) {
			font-size: 20px;
		}
	}

	.list-items {
		width: 100%;
	}

	.share-with {
		margin-left: auto;
	}

	.post-list-view {
		display: flex;
		margin-bottom: 50px;

		@media (max-width: 1024px) {
			flex-direction: column;
			margin-top: 30px;
		}

		.more-link {
			margin-top: 30px;

			@media (max-width: 1024px) {
				margin-top: 15px;
			}
		}
	}

	.post-share {
		text-align: center;
        margin: 50px 0 30px 0;

		h3 {
			font-family: "Larsseit";
			font-weight: 800;
			font-size: 24px;
			color: #424242;
			margin-bottom: 30px;
			text-transform: uppercase;
  
			@media (max-width: 767px) {
			  font-size: 18px;
			  margin-bottom: 15px;
			}
		}

		.share-social {
			list-style: none;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;

			.share-icon {
				margin: 0 25px;
				background-size: 100%;
				height: 29px;
				background-repeat: no-repeat;
				display: flex;
				padding: 0;

				&:before {
					display: none;
				}

				@media (max-width: 767px) {
					height: 23px;
				}

				a, span {
					font-size: 0;
					display: inline-block;
					height: 29px;
					width: 100%;
					cursor: pointer;

					@media (max-width: 767px) {
						height: 23px;
					}
				}

				&.facebook {
					width: 15px;
					background-image: url(${0});

					@media (max-width: 767px) {
						width: 12px;
					}
				}

				&.twitter {
					width: 34px;
					background-image: url(${0});

					@media (max-width: 767px) {
						width: 28px;
					}
				}

				&.linkedin {
					width: 30px;
					background-image: url(${0});

					@media (max-width: 767px) {
						width: 24px;
					}
				}

				&.copy {
					width: 25px;
					background-image: url(${0});

					@media (max-width: 767px) {
						width: 20px;
					}
				}
			}
		}
	}

	.voice-form-main {
		margin-top: 60px;

		h3 {
			font-family: "Larsseit";
			font-weight: 800;
			text-align: center;
			font-size: 24px;
			margin-bottom: 20px;
		}
	}

	.voice-subscribe-form {
        max-width: 670px;
		margin: 0 auto;
		position: relative;

		.legal-consent-container {
			display: none;
		}

		.input {
			margin-right: 10px !important;

			@media (max-width: 767px) {
				margin-right: 0 !important;
				margin-bottom: 10px;
			}
		}

		input {
			width: 100% !important;
		}

		form {
			display: flex;
			flex-wrap: wrap;

			@media (max-width: 767px) {
				flex-direction: column;
			}
		}

		.hs-firstname,
		.hs-lastname {
			width: 165px !important;

			@media (max-width: 767px) {
				width: 100% !important;
			}
		}

		.hs-email {
			width: 195px !important;

			@media (max-width: 767px) {
				width: 100% !important;
			}
		}

		.hs_error_rollup {
			position: absolute;
			font-family: "Sailec";
			left: 0;
			bottom: -30px;
			color: #FF5F79;
			font-size: 12px;

			@media (max-width: 767px) {
				position: static;
				text-align: center;
				margin-bottom: 5px;
			}

			ul {
				list-style: none;
			}
		}

		.no-list {
			list-style: none;
		}

		fieldset {
			max-width: 100% !important;

			.hs-error-msgs {
				display: none !important;
			}
		}

		.hs-submit {
			@media (max-width: 640px) {
				text-align: center;
			}
		}

		.hs-button {
			font-family: "Larsseit";
			font-size: 19px;
			width: 100% !important;
			max-width: 160px !important;
			background-color: #00C1DE;
			border-color: #00C1DE;
			color: #FFF;
			font-weight: 800;
			line-height: 19px;
			border-radius: 0;
			text-transform: uppercase;
			appearance: none;

			@media (min-width: 641px) {
				max-width: 100% !important;
			}

			&:hover {
				background-color: #0090A6;
				border-color: #0090A6;
			}

			&:focus,
			&:active {
				background-color: #00606F;
				border-color: #00606F;
			}
		}
	}

	.back-to-jdc-collections {
		margin: 30px 0 50px 0;
		text-align: center;
	}
`),s.a,c.a,n.a,r.a)}}]);