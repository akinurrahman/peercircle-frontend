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
} from "lucide-react";

export interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  subitems?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
  { icon: Home, label: "Home", href: "/feed" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: Compass, label: "Explore", href: "/explore" },
  { icon: MessageCircle, label: "Messages", href: "/messages" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: PlusCircle, label: "Create", href: "/create" },
  {
    icon: User,
    label: "Profile",
    href: "/profile",
    subitems: [
      { icon: User, label: "View Profile", href: "/profile/view" },
      { icon: Settings, label: "Edit Profile", href: "/profile/edit" },
    ],
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
