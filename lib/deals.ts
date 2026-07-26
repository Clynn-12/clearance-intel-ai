export type StoreId = 'home-depot' | 'walmart' | 'dollar-general'

export type Store = {
  id: StoreId
  name: string
  short: string
  /** How this retailer signals a final markdown in the price ending. */
  tell: string
}

export const STORES: Record<StoreId, Store> = {
  'home-depot': {
    id: 'home-depot',
    name: 'Home Depot',
    short: 'HD',
    tell: 'Price ending in .06 or .03 = final markdown. Yellow tag = clearance.',
  },
  walmart: {
    id: 'walmart',
    name: 'Walmart',
    short: 'WMT',
    tell: 'Ending in .00 = final clearance. $0.01 on the scanner = pull from floor.',
  },
  'dollar-general': {
    id: 'dollar-general',
    name: 'Dollar General',
    short: 'DG',
    tell: 'Penny list items scan $0.01. Ending in .50 / .25 = markdown ladder.',
  },
}

export type Deal = {
  id: string
  name: string
  store: StoreId
  category: string
  sku: string
  retail: number
  price: number
  /** true when the item rings up at a single cent */
  penny: boolean
  image: string
  confirmations: number
  spotted: string
  region: string
  /** model-scored likelihood the price is still live, 0-100 */
  signal: number
  note: string
}

export const DEALS: Deal[] = [
  {
    id: 'dg-detergent',
    name: '96 oz Laundry Detergent, Spring Rain',
    store: 'dollar-general',
    category: 'Household',
    sku: 'DG 41-7782',
    retail: 12.95,
    price: 0.01,
    penny: true,
    image: '/deals/laundry-detergent-jug.png',
    confirmations: 214,
    spotted: '9 min ago',
    region: 'TX, OK, AR',
    signal: 96,
    note: 'Discontinued scent rotating off the planogram. Scanning $0.01 in 3 districts — bring the ZDS lookup, do not ask staff to price check.',
  },
  {
    id: 'hd-drill',
    name: '18V Cordless Drill/Driver Kit + 2.0Ah Battery',
    store: 'home-depot',
    category: 'Tools',
    sku: 'HD 1004-88213',
    retail: 149.0,
    price: 14.03,
    penny: false,
    image: '/deals/cordless-drill-kit.png',
    confirmations: 88,
    spotted: '41 min ago',
    region: 'Nationwide',
    signal: 82,
    note: 'Ends in .03 — terminal markdown, no further cuts coming. Store inventory shows single-digit counts, so this clears within 48h.',
  },
  {
    id: 'wmt-coffee',
    name: 'Single-Serve Pod Coffee Maker, Matte Black',
    store: 'walmart',
    category: 'Kitchen',
    sku: 'WM 573-90114',
    retail: 89.0,
    price: 7.0,
    penny: false,
    image: '/deals/single-serve-coffee-maker.png',
    confirmations: 137,
    spotted: '1 hr ago',
    region: 'Southeast + Midwest',
    signal: 74,
    note: 'Ending in .00 is the last stop on the Walmart ladder. Shelf label often still reads $34 — scan the barcode, not the tag.',
  },
  {
    id: 'hd-lights',
    name: '48 ft Outdoor String Lights, 24 Edison Bulbs',
    store: 'home-depot',
    category: 'Outdoor',
    sku: 'HD 1006-31740',
    retail: 79.98,
    price: 0.01,
    penny: true,
    image: '/deals/outdoor-string-lights.png',
    confirmations: 61,
    spotted: '2 hr ago',
    region: 'FL, GA, AL',
    signal: 68,
    note: 'End-of-season SKU reset gone wrong. Penny rings confirmed at 6 stores; most have relabeled by now, so treat this as a fading window.',
  },
  {
    id: 'wmt-headphones',
    name: 'Over-Ear Wireless Headphones, ANC',
    store: 'walmart',
    category: 'Electronics',
    sku: 'WM 118-44902',
    retail: 129.0,
    price: 12.0,
    penny: false,
    image: '/deals/wireless-headphones.png',
    confirmations: 302,
    spotted: '3 hr ago',
    region: 'Nationwide',
    signal: 91,
    note: 'Replaced by a 2026 refresh. Heavy stock in back rooms — worth asking for an overstock pull, which staff will usually do for clearance.',
  },
  {
    id: 'dg-totes',
    name: '27 qt Clear Storage Totes, 2-Pack',
    store: 'dollar-general',
    category: 'Storage',
    sku: 'DG 88-2011',
    retail: 16.5,
    price: 2.5,
    penny: false,
    image: '/deals/storage-totes.png',
    confirmations: 45,
    spotted: '5 hr ago',
    region: 'Regional test',
    signal: 54,
    note: 'Sitting at the .50 rung of the markdown ladder. Historically drops to penny two weeks after hitting this price — worth watching, not driving for.',
  },
]

export const TICKER: string[] = [
  'DG penny list refreshed — 41 new SKUs flagged',
  'HD .03 sweep detected in 212 stores',
  'WMT electronics reset begins Tuesday',
  'Seasonal outdoor clearing at 75% in FL/GA',
  '3 penny confirmations in the last 10 minutes',
  'DG hair care ladder dropped to .25',
]

export const METRICS = [
  { label: 'Live deals tracked', value: '18,402' },
  { label: 'Penny items today', value: '41' },
  { label: 'Stores monitored', value: '31,770' },
  { label: 'Avg. markdown', value: '87%' },
]
