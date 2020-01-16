// const PanelReducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_DATA_FROM_FORM':
//       return {
//         ...state,
//         panel: action.payload
//       };
//     case 'ADD_DATA_FROM_SERVER':
//       return {
//         ...state,
//         panel: action.payload
//       };
//     case 'READ_DATA_FROM_PANEL':
//       return {
//         ...state,
//         panel: action.payload
//       }
//     // case 'SET_POSTS':
//     //   return {
//     //     ...state,
//     //     posts: action.payload
//     //   };
//     // case 'ADD_POST':
//     //   return {
//     //     ...state,
//     //     posts: state.posts.concat(action.payload)
//     //   };
//     // case 'REMOVE_POST':
//     //   return {
//     //     ...state,
//     //     posts: state.posts.filter(post => post.id !== action.payload)
//     //   };
//     case 'SET_ERROR':
//       return {
//         ...state,
//         error: action.payload
//       };
//     default:
//       return state;
//   }
// };

// export default PanelReducer;