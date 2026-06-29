export interface PizzaOrder {
  selected: boolean;
  qty: string;
  notes: string;
}

export interface Booking {
  id: string;
  createdAt: string;
  status: "pending" | "accepted" | "declined";
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  location: string;
  guests: string;
  pizzas: Record<string, PizzaOrder>;
  dietary: string[];
  allergies: string;
  message: string;
}
