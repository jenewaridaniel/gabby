// types.ts

export type Room = {
    id: string;
    name: string;
    amenities: string[];
    status: string;
  };
  
  export type Booking = {
    id: string;
    roomId: string;
    userId: string;
    checkInDate: string; // or Date if you’re using Date objects
    checkOutDate: string;
  };
  
  export type Stats = {
    totalRooms: number;
    totalBookings: number;
    revenue: number;
  };
  