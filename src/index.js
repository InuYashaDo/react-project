import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// import React, { useState, useEffect, useRef } from 'react';
// import ReactDOM from 'react-dom';
// import './index.less';

/**
 * 营销卡片渲染数据
 */
// interface IDirectVoucher {
//   /** 品牌名 */
//   brandName?: string;
//   /** 品牌logo */
//   brandLogo?: string;
//   /** 距离描述 */
//   distanceDesc?: string;
//   /** 活动素材图 */
//   campImage?: string;
//   /** 营销标签 */
//   promoLogo?: string | string[];
//   /** 券描述 */
//   voucherDesc?: string;
//   /** 券 */
//   benefitAmount?: string;
//   /** 特价券原价 */
//   oriPriceAmount?: string;
//   /** 折扣描述 */
//   discountDesc?: string;
//   /** 库存 */
//   voucherStockNum?: string;
// }

// const cardDataList = [
//   {
//     brandName: '弄堂里',
//     brandLogo:
//       'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*anNdQqA_I_AAAAAAAAAAAAAAARQnAQ',
//     distanceDesc: '500m',
//     campImage:
//       'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*U29sSqgeU-4AAAAAAAAAAAAAARQnAQ',
//     promoLogo: [
//       'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*y6CTRo9L2oEAAAAAAAAAAAAAARQnAQ',
//       'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*Q1d4SIoeKRkAAAAAAAAAAAAAARQnAQ',
//     ],
//     voucherDesc: '弄堂里14元超值优惠券包x2',
//     benefitAmount: '1',
//     oriPriceAmount: '28',
//     discountDesc: '0.6折',
//     voucherStockNum: '库存888份',
//   },
//   {
//     brandName: '弄堂里',
//     brandLogo:
//       'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*anNdQqA_I_AAAAAAAAAAAAAAARQnAQ',
//     distanceDesc: '500m',
//     campImage:
//       'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*U29sSqgeU-4AAAAAAAAAAAAAARQnAQ',
//     promoLogo: [
//       'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*Q1d4SIoeKRkAAAAAAAAAAAAAARQnAQ',
//     ],
//     voucherDesc: '弄堂里14元超值优惠券包x2',
//     benefitAmount: '1',
//     discountDesc: '0.6折',
//   },
//   {
//     brandName: '飞猪',
//     brandLogo:
//       'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*dCL5Q4oBaQsAAAAAAAAAAAAAARQnAQ',
//     campImage:
//       'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*MZ7VSaNZXRYAAAAAAAAAAAAAARQnAQ',
//     promoLogo:
//       'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*90WEQLmnKdkAAAAAAAAAAAAAARQnAQ',
//     voucherDesc: '南方航空20元优惠券',
//     benefitAmount: '20',
//   },
// ];

// function timeDown(nowDate) {
//   const timing = parseInt((new Date() - nowDate) / 1000);
//   return timing;
// }

// function shopRequest() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(1);
//     }, 1000);
//   });
// }

// const ShopBtn = () => {
//   const nowDate = new Date();
//   let timer;

//   const [shopDone, setShopDone] = useState(false);
//   const haveShop = useRef(false);
//   const [time, setTime] = useState(10);

//   const handleShop = () => {
//     if (time > 0) {
//       console.log('还未到抢购时间');
//       return;
//     }

//     if (!haveShop.current) {
//       haveShop.current = true;
//       shopRequest().then(() => {
//         setShopDone(true);
//       });
//     } else {
//       console.log('已在抢购中');
//     }
//   };

//   useEffect(() => {
//     timer = setInterval(() => {
//       const timing = timeDown(nowDate);

//       setTime(10 - timing);

//       if (timing >= 10) {
//         clearInterval(timer);
//       }
//     }, 1000);
//   }, []);

//   return (
//     <div className='shop-btn' onClick={handleShop}>
//       {time <= 0 ? (shopDone ? '已抢购' : '抢购') : `${time}s`}
//     </div>
//   );
// };

// const PromoLogoContainer = (props) => {
//   const { promoLogo } = props;

//   const renderPromoLogoItem = (url) => {
//     return <img src={url} alt='' className='promo-logo-item' />;
//   };

//   return (
//     <div className='promo-logo-container'>
//       {Array.isArray(promoLogo)
//         ? promoLogo.map((url) => renderPromoLogoItem(url))
//         : renderPromoLogoItem(promoLogo)}
//     </div>
//   );
// };

// const Card = (props) => {
//   const { data } = props;
//   return (
//     <div className='card'>
//       <div className='card-left'>
//         <div className='card-left-top'>
//           <div className='card-left-title'>
//             <img src={data.brandLogo} alt='' />
//             <div className='left-top-title'>{data.brandName}</div>
//           </div>
//           {data.distanceDesc && (
//             <div className='card-right-distance'>{data.distanceDesc}</div>
//           )}
//         </div>
//         <div className='card-left-bottom'>
//           <img src={data.campImage} alt='' className='left-camp-image' />
//           <div className='left-bottom-right'>
//             {data.promoLogo && (
//               <PromoLogoContainer promoLogo={data.promoLogo} />
//             )}
//             <div className='voucher-desc'>{data.voucherDesc}</div>
//             {data.benefitAmount && (
//               <div className='real-price'>{data.benefitAmount}元</div>
//             )}
//             {data.oriPriceAmount && (
//               <div className='origin-price'>{data.oriPriceAmount}元</div>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className='card-right'>
//         {data.discountDesc && (
//           <div className='top-discount'>{data.discountDesc}</div>
//         )}
//         <ShopBtn />
//       </div>
//     </div>
//   );
// };

// const CardList = (props) => {
//   return (
//     <>
//       {props.list.map((data) => (
//         <Card data={data} />
//       ))}
//     </>
//   );
// };

// ReactDOM.render(
//   <CardList list={cardDataList} />,
//   document.getElementById('root')
// );
