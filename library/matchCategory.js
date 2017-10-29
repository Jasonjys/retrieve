export default function(category) {
  switch (category){
    case 'eletronic':
      return 'Eletronic'
      break;
    case 'clothingShoes':
      return 'Clothing/Shoes'
      break;
    case 'supply':
      return 'School/Office Supply'
      break;
    case 'jewelry':
      return 'Jewelry & Watch';
      break;
    case 'wck':
      return 'Wallet/Card/Key'
      break;
    case 'pet':
      return 'Pet'
      break;
    case 'bag':
      return 'Bag'
      break;
    case 'others':
      return 'Others'
      break;
  }
}