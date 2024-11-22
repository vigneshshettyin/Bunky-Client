import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

const NAV_ITEMS = [
  { name: 'Daily Sales', href: '/sales-list' },
  { name: 'Live Stock', href: '/sales-list' },
  { name: 'Create Sale', href: '/sales' },
  { name: 'Logout', href: '/login' },
] as const

export function useNavigation() {
  const [activeSection, setActiveSection] = useState('create-sale')
  const router = useRouter()

  const handleNavigation = useCallback((item: typeof NAV_ITEMS[number]) => {
    const section = item.name.toLowerCase().replace(' ', '-')
    setActiveSection(section)

    if (item.name === 'Logout') {
      localStorage.removeItem('token')
    }

    router.push(item.href)
  }, [router])

  return { activeSection, handleNavigation, NAV_ITEMS }
}

