// // +------------------+
// |  User Service    |
// |------------------|
// |  Register User   |
// |  Login User      |
// |  View Profile    |
// +---------+--------+
//           |
//           v
// +---------+--------+
// |  Hotel Service   |
// |------------------|
// |  Add Hotel       |
// |  View Hotels     |
// |  Update Hotel    |
// +---------+--------+
//           |
//           v
// +---------+--------+
// |  Room Service    |
// |------------------|
// |  Add Room        |
// |  View Rooms      |
// |  Update Room     |
// +---------+--------+
//           |
//           v
// +---------+--------+
// | Booking Service  |
// |------------------|
// | Make Reservation |
// | View Reservations|
// | Cancel Booking   |
// +---------+--------+
//           |
//           v
// +---------+--------+
// | Payment Service  |
// |------------------|
// | Process Payment  |
// | View Payments    |
// +------------------+

class User {
  constructor(
    public userId: string,
    public name: string,
    public email: string,
    public password: string
  ) {}

  // Other methods for user management
}

class Hotel {
  constructor(
    public hotelId: string,
    public name: string,
    public address: string,
    public description: string
  ) {}

  // Other methods for hotel management
}

class Room {
  constructor(
    public roomId: string,
    public hotelId: string,
    public roomNumber: string,
    public type: string,
    public price: number
  ) {}

  // Other methods for room management
}

class Booking {
  constructor(
    public bookingId: string,
    public userId: string,
    public roomId: string,
    public checkInDate: Date,
    public checkOutDate: Date,
    public status: string // e.g., booked, cancelled
  ) {}

  // Other methods for booking management
}

class Payment {
  constructor(
    public paymentId: string,
    public userId: string,
    public bookingId: string,
    public amount: number,
    public date: Date,
    public status: string // e.g., paid, pending
  ) {}

  // Other methods for payment management
}

class UserAPI {
  private static users: Map<string, User> = new Map();

  static async register(userData: any): Promise<User> {
    const userId = Date.now().toString();
    const newUser = new User(
      userId,
      userData.name,
      userData.email,
      userData.password
    );
    UserAPI.users.set(userId, newUser);
    return newUser;
  }

  static async login(credentials: any): Promise<string> {
    const user = [...UserAPI.users.values()].find(
      (user) => user.email === credentials.email
    );
    if (user && user.password === credentials.password) {
      return "authToken"; // Replace with actual logic to generate auth token
    } else {
      throw new Error("Invalid credentials");
    }
  }

  static async viewProfile(userId: string): Promise<User> {
    const user = UserAPI.users.get(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}

class HotelAPI {
  private static hotels: Map<string, Hotel> = new Map();

  static async add(hotelData: any): Promise<Hotel> {
    const hotelId = Date.now().toString();
    const newHotel = new Hotel(
      hotelId,
      hotelData.name,
      hotelData.address,
      hotelData.description
    );
    HotelAPI.hotels.set(hotelId, newHotel);
    return newHotel;
  }

  static async viewAll(): Promise<Hotel[]> {
    return [...HotelAPI.hotels.values()];
  }

  static async update(hotelId: string, hotelData: any): Promise<Hotel> {
    const hotel = HotelAPI.hotels.get(hotelId);
    if (!hotel) {
      throw new Error("Hotel not found");
    }
    hotel.name = hotelData.name;
    hotel.address = hotelData.address;
    hotel.description = hotelData.description;
    HotelAPI.hotels.set(hotelId, hotel);
    return hotel;
  }

  static async findById(hotelId: string): Promise<Hotel> {
    const hotel = HotelAPI.hotels.get(hotelId);
    if (!hotel) {
      throw new Error("Hotel not found");
    }
    return hotel;
  }
}

class RoomAPI {
  private static rooms: Map<string, Room> = new Map();

  static async add(hotelId: string, roomData: any): Promise<Room> {
    const roomId = Date.now().toString();
    const newRoom = new Room(
      roomId,
      hotelId,
      roomData.roomNumber,
      roomData.type,
      roomData.price
    );
    RoomAPI.rooms.set(roomId, newRoom);
    return newRoom;
  }

  static async viewAll(hotelId: string): Promise<Room[]> {
    return [...RoomAPI.rooms.values()].filter(
      (room) => room.hotelId === hotelId
    );
  }

  static async update(
    hotelId: string,
    roomId: string,
    roomData: any
  ): Promise<Room> {
    const room = RoomAPI.rooms.get(roomId);
    if (!room) {
      throw new Error("Room not found");
    }
    room.roomNumber = roomData.roomNumber;
    room.type = roomData.type;
    room.price = roomData.price;
    RoomAPI.rooms.set(roomId, room);
    return room;
  }

  static async findById(hotelId: string, roomId: string): Promise<Room> {
    const room = RoomAPI.rooms.get(roomId);
    if (!room || room.hotelId !== hotelId) {
      throw new Error("Room not found");
    }
    return room;
  }
}

class BookingAPI {
  private static bookings: Map<string, Booking> = new Map();

  static async make(bookingData: any): Promise<Booking> {
    const bookingId = Date.now().toString();
    const newBooking = new Booking(
      bookingId,
      bookingData.userId,
      bookingData.roomId,
      new Date(bookingData.checkInDate),
      new Date(bookingData.checkOutDate),
      "booked"
    );
    BookingAPI.bookings.set(bookingId, newBooking);
    return newBooking;
  }

  static async viewAll(userId: string): Promise<Booking[]> {
    return [...BookingAPI.bookings.values()].filter(
      (booking) => booking.userId === userId
    );
  }

  static async cancel(bookingId: string): Promise<void> {
    const booking = BookingAPI.bookings.get(bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }
    booking.status = "cancelled";
    BookingAPI.bookings.set(bookingId, booking);
  }

  static async findById(bookingId: string): Promise<Booking> {
    const booking = BookingAPI.bookings.get(bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }
    return booking;
  }
}

class PaymentAPI {
  private static payments: Map<string, Payment> = new Map();

  static async process(paymentData: any): Promise<Payment> {
    const paymentId = Date.now().toString();
    const newPayment = new Payment(
      paymentId,
      paymentData.userId,
      paymentData.bookingId,
      paymentData.amount,
      new Date(),
      "paid"
    );
    PaymentAPI.payments.set(paymentId, newPayment);
    return newPayment;
  }

  static async viewAll(userId: string): Promise<Payment[]> {
    return [...PaymentAPI.payments.values()].filter(
      (payment) => payment.userId === userId
    );
  }

  static async findById(paymentId: string): Promise<Payment> {
    const payment = PaymentAPI.payments.get(paymentId);
    if (!payment) {
      throw new Error("Payment not found");
    }
    return payment;
  }
}
