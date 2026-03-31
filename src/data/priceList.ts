export interface PriceItem {
  category: string;
  name: string;
  price: number;
  basis: string;
  corePrice: number;
  returnable: boolean;
}

export const PRICE_LIST: PriceItem[] = [
  // ACCESSORY PARTS
  { category: 'ACCESSORY PARTS', name: 'BEARING (ANY)',           price: 3.99,   basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'ACCESSORY PARTS', name: 'CABLE (ANY)',             price: 9.99,   basis: 'Each', corePrice: 0,  returnable: true },
  // AXLES
  { category: 'AXLES', name: 'AXLE SHAFT FRONT',                  price: 39.99,  basis: 'Each', corePrice: 5,  returnable: true },
  { category: 'AXLES', name: 'AXLE SHAFT SOLID TYPE',             price: 34.99,  basis: 'Each', corePrice: 5,  returnable: true },
  { category: 'AXLES', name: 'C-V AXLE',                          price: 28.99,  basis: 'Each', corePrice: 5,  returnable: true },
  { category: 'AXLES', name: 'CARRIER ASSEMBLY',                  price: 99.99,  basis: 'Each', corePrice: 5,  returnable: true },
  { category: 'AXLES', name: 'FRONT AXLE ASSY 4X4',               price: 229.99, basis: 'Each', corePrice: 25, returnable: true },
  { category: 'AXLES', name: 'FRONT AXLE W/O 4X4',               price: 179.99, basis: 'Each', corePrice: 25, returnable: true },
  { category: 'AXLES', name: 'HALF SHAFT',                        price: 24.99,  basis: 'Each', corePrice: 5,  returnable: true },
  { category: 'AXLES', name: 'REAR AXLE COMPLETE',                price: 189.99, basis: 'Each', corePrice: 25, returnable: true },
  { category: 'AXLES', name: 'REAR AXLE DUALLY',                  price: 289.99, basis: 'Each', corePrice: 50, returnable: true },
  { category: 'AXLES', name: 'REAR AXLE W/O BRAKES',              price: 169.99, basis: 'Each', corePrice: 25, returnable: true },
  { category: 'AXLES', name: 'REAR END DROP OUT',                 price: 129.99, basis: 'Each', corePrice: 10, returnable: true },
  { category: 'AXLES', name: 'REAR END PINION/RING',              price: 59.99,  basis: 'Each', corePrice: 5,  returnable: true },
  { category: 'AXLES', name: 'REAREND HOUSING BAR',               price: 119.99, basis: 'Each', corePrice: 10, returnable: true },
  { category: 'AXLES', name: 'SPIDER GEAR',                       price: 29.99,  basis: 'Each', corePrice: 5,  returnable: true },
  // DASH / COWL
  { category: 'DASH / COWL', name: 'AIR BAG',                     price: 69.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'AIR BAG COVER',               price: 24.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'CIGARETTE LIGHTER/SOCKET',    price: 3.99,   basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'CLOCK',                       price: 4.99,   basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'CLOCK SPRING',                price: 25.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'CLUSTER',                     price: 49.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'CLUSTER FULL DIGITAL',        price: 74.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'DASH ASSY NO RADIO',          price: 99.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'DASH PAD',                    price: 27.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'GAUGE SINGLE',                price: 4.99,   basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'GLOVE BOX ASSY',              price: 19.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'GLOVE BOX DOOR',              price: 12.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'GLOVE BOX INSERT',            price: 5.99,   basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'GLOVE BOX LOCK',              price: 2.99,   basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'INSTR CLUSTER BEZEL',         price: 12.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'INSTRUMENT CIRCUIT BOARD',    price: 12.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'INSTRUMENT CLUSTER LENS',     price: 9.99,   basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'PEDAL (EACH)',                 price: 24.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'PEDAL ASSY BRK/CLUTCH',       price: 28.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'SPEEDOMETER CABLE',           price: 10.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'VENT',                        price: 5.99,   basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'VENT PANEL (COWL)',           price: 14.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'WASHER BOTTLE',               price: 10.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'WASHER BOTTLE MOTOR',         price: 7.99,   basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'WIPER ARM',                   price: 5.99,   basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'WIPER BLADE',                 price: 1.49,   basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'WIPER LINKAGE',               price: 14.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DASH / COWL', name: 'WIPER MOTOR',                 price: 19.99,  basis: 'Each', corePrice: 5,  returnable: true },
  // DOORS
  { category: 'DOORS', name: 'CAR HATCH',                         price: 109.99, basis: 'Each', corePrice: 10, returnable: true },
  { category: 'DOORS', name: 'DOOR CAR',                          price: 94.99,  basis: 'Each', corePrice: 10, returnable: true },
  { category: 'DOORS', name: 'DOOR HANDLE CABLE',                 price: 2.99,   basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DOORS', name: 'DOOR HANDLE INTERIOR',              price: 12.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DOORS', name: 'DOOR HANDLE KEYLESS',               price: 19.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DOORS', name: 'DOOR HANDLE OUTSIDE',               price: 14.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DOORS', name: 'DOOR LOCK ACTUATOR',                price: 16.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DOORS', name: 'DOOR STRIKER',                      price: 4.99,   basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DOORS', name: 'DOOR SUV',                          price: 99.99,  basis: 'Each', corePrice: 10, returnable: true },
  { category: 'DOORS', name: 'DOOR TRUCK',                        price: 104.99, basis: 'Each', corePrice: 10, returnable: true },
  { category: 'DOORS', name: 'HINGE (ALL)',                       price: 13.99,  basis: 'Each', corePrice: 0,  returnable: true },
  { category: 'DOORS', name: 'INTERIOR DOOR PANEL',               price: 34.99,  basis: 'Each', corePrice: 0,  returnable: true },
];

export const CATEGORIES = Array.from(new Set(PRICE_LIST.map(i => i.category))).sort();
