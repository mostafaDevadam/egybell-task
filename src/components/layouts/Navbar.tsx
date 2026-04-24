import React, { useState } from 'react'
import { Link } from 'react-router'
import LogoutButton from '../buttons/LogoutButton'
import { useAppSelector } from '../../store/store'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from 'react-i18next'
import useLocale from '../../hooks/useLocale'

const Navbar = () => {

  //const isAuth = false
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const { t, i18n } = useTranslation()

  const { isAuth, role } = useAppSelector((state) => state.auth)

  console.log("state isAuth:", isAuth)

  const locale = useLocale()

  console.log("locale:", locale)

  return (
    <>
      <nav className={`bg-white shadow-sm sticky top-0 z-50 dark:bg-gray-800 `}>
        <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - App Logo/Name */}
            <div className="flex items-center">
              <Link
                to={`/${locale}`}
                className="text-xl font-bold text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors"
              >
                {t("navbar.app")}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-x-3">
              {/* Language Switcher */}

              {/* auth */}
              {isAuth ?
                (
                  <>
                    <div className='mx-auto flex flex-row gap-5'>
                      <Link
                        to={`/${locale}`}
                        data-testid="dashboard"
                        className="px-5 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
                      >
                        {t("navbar.dashboard")}
                      </Link>
                      {role === "admin" && <Link
                        to={`/${locale}/users`}
                        data-testid="users-link"
                        role="users"
                        className="px-5 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
                      >
                        {t("navbar.users")}
                      </Link>}
                      {role === "admin" && <Link
                        to={`/${locale}/logs`}
                        data-testid="logs-link"
                        className="px-5 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
                      >
                        {t("navbar.logs")}
                      </Link>}
                      <Link
                        to={`/${locale}/profile`}
                        data-testid="profile"
                        className="px-5 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
                      >
                        {t("navbar.profile")}
                      </Link>
                    </div>


                    <LogoutButton isMobile={false} title={t("navbar.logout")} />
                  </>
                )
                :
                <>
                  <Link
                    to={`/${locale}/login`}
                    data-testid="login-link"
                    className="px-5 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
                  >
                    {t("navbar.login")}
                  </Link>
                  <Link
                    to={`/${locale}/register`}
                    data-testid="register-link"
                    className="px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    {t("navbar.register")}
                  </Link>
                </>}
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                aria-controls="mobile-menu"
                aria-expanded={mobileMenuOpen ? "true" : "false"}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {mobileMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

              {isAuth ?
                (
                  <>
                    <Link
                      to={`/${locale}`}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
                    >
                      {t("navbar.dashboard")}
                    </Link>
                    {role === "admin" && <Link
                      to={`/${locale}/users`}
                      data-testid="users-link"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
                    >
                      {t("navbar.users")}
                    </Link>}
                    {role === "admin" && <Link
                      to={`/${locale}/logs`}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
                    >
                      {t("navbar.logs")}
                    </Link>}
                    <Link
                      to={`/${locale}/profile`}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
                    >
                      {t("navbar.profile")}
                    </Link>

                    <LogoutButton isMobile={true} title="Logout" />

                  </>
                )
                :
                <>
                  <Link
                    to={`/${locale}/login`}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700"
                  >
                    {t("navbar.login")}
                  </Link>
                  <Link
                    to={`/${locale}/register`}
                    className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    {t("navbar.register")}
                  </Link>
                </>}
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </nav>
    </>



  )
}

export default Navbar