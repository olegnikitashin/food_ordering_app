export interface CreateVendorInput {
  name: string;
  owner_name: string;
  food_type: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface LoginVendorInput {
  email: string;
  password: string;
}

export interface VendorPayload {
  _id: string;
  email: string;
  name: string;
  foodType: [string];
}

export interface PatchVendorInput {
  name: string;
  food_type: [string];
  address: string;
  phone: string;
}
