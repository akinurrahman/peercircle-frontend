import {
  Bell,
  Compass,
  Home,
  LogOut,
  MessageCircle,
  PlusCircle,
  Search,
  Settings,
  Shield,
  User,
  Wallet,
} from "lucide-react";

export interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  subitems?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
  { icon: Home, label: "Home", href: "/feed/posts" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: Compass, label: "Explore", href: "/explore" },
  { icon: MessageCircle, label: "Messages", href: "/messages" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: PlusCircle, label: "Create post" },
  { icon: Wallet, label: "Sell Product" },
  {
    icon: User,
    label: "Profile",
    href: "/profile",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
    subitems: [
      { icon: User, label: "Account", href: "/settings/account" },
      { icon: Shield, label: "Privacy", href: "/settings/privacy" },
      { icon: LogOut, label: "Logout" },
    ],
  },
];
