/**
 * A large realistic Symbols component for benchmarking shorthand compression.
 *
 * This simulates a full dashboard page with navigation, sidebar, main content area,
 * charts, tables, modals, forms, and responsive breakpoints.
 */

export const DashboardPage = {
  extends: 'Flex',
  flow: 'y',
  width: '100%',
  minHeight: '100vh',
  background: 'gray1',
  color: 'title',
  fontFamily: 'primary',
  position: 'relative',
  overflow: 'hidden',

  state: {
    sidebarOpen: true,
    activeTab: 'overview',
    notifications: [],
    searchQuery: '',
    selectedRows: [],
    sortColumn: 'name',
    sortDirection: 'asc',
    currentPage: 1,
    pageSize: 25,
    modalOpen: false,
    modalType: null,
    filterStatus: 'all',
    dateRange: { start: null, end: null },
    chartPeriod: '7d',
    theme: 'dark'
  },

  '@dark': { background: 'gray1', color: 'white' },
  '@light': { background: 'white', color: 'gray1' },

  // ── Top Navigation Bar ──
  TopNav: {
    extends: 'Flex',
    tag: 'header',
    padding: 'Z2 A2',
    background: 'gray2',
    align: 'center space-between',
    position: 'sticky',
    top: '0',
    zIndex: 100,
    borderWidth: '0 0 1px 0',
    borderStyle: 'solid',
    borderColor: 'line',
    transition: 'background 0.2s ease',
    boxShadow: 'black .10, 0px, 2px, 8px, 0px',

    '@mobile': { padding: 'Y2 A' },
    '@tablet': { padding: 'Z A1' },

    ':hover': { background: 'gray2 1 +2' },

    LeftSection: {
      extends: 'Flex',
      align: 'center',
      gap: 'A',

      MenuButton: {
        extends: 'IconButton',
        icon: 'menu',
        theme: 'transparent',
        padding: 'Y2',
        borderRadius: 'Z',
        cursor: 'pointer',
        display: 'none',
        '@tablet': { display: 'flex' },
        onClick: (e, el, s) => s.update({ sidebarOpen: !s.sidebarOpen })
      },

      Logo: {
        extends: 'Flex',
        align: 'center',
        gap: 'Y2',
        cursor: 'pointer',
        Icon: { name: 'logo', boxSize: 'B1' },
        Title: {
          tag: 'strong',
          text: 'Dashboard',
          fontSize: 'A1',
          fontWeight: '700',
          letterSpacing: '-0.02em',
          '@mobile': { display: 'none' }
        }
      }
    },

    CenterSection: {
      extends: 'Flex',
      flex: '1',
      maxWidth: 'G',
      margin: '- A2',
      '@mobile': { display: 'none' },

      SearchBar: {
        extends: 'Flex',
        width: '100%',
        background: 'gray3 0.5',
        borderRadius: 'A',
        padding: 'Y2 A',
        align: 'center',
        gap: 'Y2',
        transition: 'background 0.15s ease, border-color 0.15s ease',
        border: 'gray3 1px solid',
        ':focus-within': {
          background: 'gray3 0.8',
          borderColor: 'blue 0.5'
        },
        Icon: {
          name: 'search',
          boxSize: 'A',
          color: 'caption',
          opacity: '0.6'
        },
        Input: {
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'title',
          flex: '1',
          fontSize: 'Z2',
          placeholder: 'Search anything...',
          onInput: (e, el, s) => s.update({ searchQuery: e.target.value })
        },
        Shortcut: {
          extends: 'Text',
          text: '⌘K',
          fontSize: 'Y2',
          padding: 'X Y2',
          background: 'gray3 0.3',
          borderRadius: 'Y',
          color: 'caption'
        }
      }
    },

    RightSection: {
      extends: 'Flex',
      align: 'center',
      gap: 'Z2',

      NotificationBell: {
        extends: 'IconButton',
        icon: 'bell',
        theme: 'transparent',
        position: 'relative',
        padding: 'Y2',
        borderRadius: 'Z',
        ':hover': { background: 'gray3 0.5' },
        Badge: {
          extends: 'Text',
          text: (el, s) => String(s.root.notifications?.length || 0),
          position: 'absolute',
          top: '-X',
          right: '-X',
          background: 'red',
          color: 'white',
          fontSize: 'X',
          padding: 'X Y',
          borderRadius: 'Z',
          minWidth: 'Z',
          textAlign: 'center',
          hide: (el, s) => !s.root.notifications?.length
        }
      },

      ThemeToggle: {
        extends: 'IconButton',
        icon: (el, s) => (s.root.theme === 'dark' ? 'sun' : 'moon'),
        theme: 'transparent',
        padding: 'Y2',
        borderRadius: 'Z',
        ':hover': { background: 'gray3 0.5' },
        onClick: (e, el, s) => {
          s.root.update({ theme: s.root.theme === 'dark' ? 'light' : 'dark' })
        }
      },

      UserMenu: {
        extends: 'Flex',
        align: 'center',
        gap: 'Y2',
        cursor: 'pointer',
        padding: 'X Y2',
        borderRadius: 'Z',
        ':hover': { background: 'gray3 0.3' },
        Avatar: {
          src: 'user-avatar.png',
          boxSize: 'B',
          borderRadius: 'Z',
          objectFit: 'cover'
        },
        Name: {
          extends: 'Text',
          text: 'John Doe',
          fontSize: 'Z2',
          fontWeight: '500',
          '@mobile': { display: 'none' }
        },
        Icon: { name: 'chevronDown', boxSize: 'Y2', color: 'caption' }
      }
    }
  },

  // ── Main Layout ──
  MainLayout: {
    extends: 'Flex',
    flex: '1',
    overflow: 'hidden',

    // ── Sidebar ──
    Sidebar: {
      extends: 'Flex',
      tag: 'aside',
      flow: 'y',
      width: 'F1',
      minWidth: 'F1',
      background: 'gray2',
      borderWidth: '0 1px 0 0',
      borderStyle: 'solid',
      borderColor: 'line',
      padding: 'A 0',
      overflow: 'auto',
      transition: 'transform 0.25s ease, width 0.25s ease',
      zIndex: 50,

      '@tablet': {
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100%',
        boxShadow: 'black .20, 4px, 0, 16px, 0'
      },

      hide: (el, s) => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
          return !s.sidebarOpen
        }
        return false
      },

      NavSection: {
        extends: 'Flex',
        flow: 'y',
        padding: '0 Z2',
        gap: 'X',

        SectionLabel: {
          extends: 'Text',
          text: 'MAIN',
          fontSize: 'X',
          fontWeight: '700',
          letterSpacing: '0.08em',
          color: 'caption',
          padding: 'Y2 A',
          textTransform: 'uppercase'
        },

        childExtends: 'Flex',
        childProps: {
          align: 'center',
          gap: 'Z',
          padding: 'Z A',
          borderRadius: 'Z',
          cursor: 'pointer',
          color: 'caption',
          fontSize: 'Z2',
          fontWeight: '500',
          transition: 'background 0.15s ease, color 0.15s ease',
          ':hover': {
            background: 'gray3 0.3',
            color: 'title'
          }
        },

        OverviewLink: {
          Icon: { name: 'dashboard', boxSize: 'A' },
          Label: { text: 'Overview' },
          isActive: (el, s) => s.activeTab === 'overview',
          '.isActive': { background: 'blue 0.15', color: 'blue' },
          onClick: (e, el, s) => s.update({ activeTab: 'overview' })
        },
        AnalyticsLink: {
          Icon: { name: 'chart', boxSize: 'A' },
          Label: { text: 'Analytics' },
          isActive: (el, s) => s.activeTab === 'analytics',
          '.isActive': { background: 'blue 0.15', color: 'blue' },
          onClick: (e, el, s) => s.update({ activeTab: 'analytics' })
        },
        ProjectsLink: {
          Icon: { name: 'folder', boxSize: 'A' },
          Label: { text: 'Projects' },
          isActive: (el, s) => s.activeTab === 'projects',
          '.isActive': { background: 'blue 0.15', color: 'blue' },
          onClick: (e, el, s) => s.update({ activeTab: 'projects' })
        },
        TeamLink: {
          Icon: { name: 'users', boxSize: 'A' },
          Label: { text: 'Team' },
          isActive: (el, s) => s.activeTab === 'team',
          '.isActive': { background: 'blue 0.15', color: 'blue' },
          onClick: (e, el, s) => s.update({ activeTab: 'team' })
        },
        MessagesLink: {
          Icon: { name: 'message', boxSize: 'A' },
          Label: { text: 'Messages' },
          isActive: (el, s) => s.activeTab === 'messages',
          '.isActive': { background: 'blue 0.15', color: 'blue' },
          onClick: (e, el, s) => s.update({ activeTab: 'messages' })
        }
      },

      NavSection_settings: {
        extends: 'Flex',
        flow: 'y',
        padding: '0 Z2',
        gap: 'X',
        marginTop: 'B',

        SectionLabel: {
          extends: 'Text',
          text: 'SETTINGS',
          fontSize: 'X',
          fontWeight: '700',
          letterSpacing: '0.08em',
          color: 'caption',
          padding: 'Y2 A',
          textTransform: 'uppercase'
        },

        ProfileLink: {
          extends: 'Flex',
          align: 'center',
          gap: 'Z',
          padding: 'Z A',
          borderRadius: 'Z',
          cursor: 'pointer',
          color: 'caption',
          fontSize: 'Z2',
          fontWeight: '500',
          transition: 'background 0.15s ease',
          ':hover': { background: 'gray3 0.3', color: 'title' },
          Icon: { name: 'user', boxSize: 'A' },
          Label: { text: 'Profile' }
        },
        BillingLink: {
          extends: 'Flex',
          align: 'center',
          gap: 'Z',
          padding: 'Z A',
          borderRadius: 'Z',
          cursor: 'pointer',
          color: 'caption',
          fontSize: 'Z2',
          fontWeight: '500',
          transition: 'background 0.15s ease',
          ':hover': { background: 'gray3 0.3', color: 'title' },
          Icon: { name: 'creditCard', boxSize: 'A' },
          Label: { text: 'Billing' }
        },
        SecurityLink: {
          extends: 'Flex',
          align: 'center',
          gap: 'Z',
          padding: 'Z A',
          borderRadius: 'Z',
          cursor: 'pointer',
          color: 'caption',
          fontSize: 'Z2',
          fontWeight: '500',
          transition: 'background 0.15s ease',
          ':hover': { background: 'gray3 0.3', color: 'title' },
          Icon: { name: 'shield', boxSize: 'A' },
          Label: { text: 'Security' }
        }
      }
    },

    // ── Content Area ──
    Content: {
      extends: 'Flex',
      flow: 'y',
      flex: '1',
      overflow: 'auto',
      padding: 'A2',
      gap: 'A2',
      '@mobile': { padding: 'A' },
      '@tablet': { padding: 'A1' },

      // ── Page Header ──
      PageHeader: {
        extends: 'Flex',
        align: 'center space-between',
        flexWrap: 'wrap',
        gap: 'A',

        Left: {
          extends: 'Flex',
          flow: 'y',
          gap: 'Y',
          H1: {
            text: 'Overview',
            fontSize: 'C',
            fontWeight: '700',
            letterSpacing: '-0.03em',
            color: 'title',
            '@mobile': { fontSize: 'B' }
          },
          Breadcrumb: {
            extends: 'Flex',
            align: 'center',
            gap: 'Y',
            color: 'caption',
            fontSize: 'Z',
            Link_home: {
              text: 'Home',
              href: '/',
              color: 'blue',
              ':hover': { textDecoration: 'underline' }
            },
            Separator: { text: '/' },
            Current: { text: 'Overview', fontWeight: '500' }
          }
        },

        Right: {
          extends: 'Flex',
          align: 'center',
          gap: 'Z2',
          '@mobile': { width: '100%', justifyContent: 'space-between' },

          DateRangeButton: {
            extends: 'Button',
            icon: 'calendar',
            text: 'Last 7 days',
            theme: 'field',
            padding: 'Y2 A',
            fontSize: 'Z2',
            borderRadius: 'Z',
            gap: 'Y2'
          },

          ExportButton: {
            extends: 'Button',
            icon: 'download',
            text: 'Export',
            theme: 'transparent',
            padding: 'Y2 A',
            fontSize: 'Z2',
            borderRadius: 'Z',
            gap: 'Y2',
            ':hover': { background: 'gray3 0.3' }
          },

          CreateButton: {
            extends: 'Button',
            icon: 'plus',
            text: 'Create New',
            theme: 'primary',
            padding: 'Y2 A1',
            fontSize: 'Z2',
            fontWeight: '600',
            borderRadius: 'Z',
            gap: 'Y2',
            onClick: (e, el, s) =>
              s.root.update({ modalOpen: true, modalType: 'create' })
          }
        }
      },

      // ── Stats Cards ──
      StatsGrid: {
        extends: 'Grid',
        columns: 'repeat(4, 1fr)',
        gap: 'A',
        '@tablet': { columns: 'repeat(2, 1fr)' },
        '@mobile': { columns: '1fr' },

        childExtends: 'Flex',
        childProps: {
          flow: 'y',
          padding: 'A1',
          background: 'gray2',
          borderRadius: 'A',
          gap: 'Z',
          border: 'line 1px solid',
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          ':hover': {
            borderColor: 'blue 0.3',
            boxShadow: 'blue .05, 0px, 0px, 0px, 4px'
          }
        },

        RevenueCard: {
          Header: {
            extends: 'Flex',
            align: 'center space-between',
            Label: {
              text: 'Total Revenue',
              fontSize: 'Z',
              color: 'caption',
              fontWeight: '500'
            },
            Icon: { name: 'dollarSign', boxSize: 'A', color: 'green' }
          },
          Value: {
            text: '$45,231.89',
            fontSize: 'B1',
            fontWeight: '700',
            color: 'title'
          },
          Change: {
            extends: 'Flex',
            align: 'center',
            gap: 'X',
            Icon: { name: 'arrowUp', boxSize: 'Y2', color: 'green' },
            Text: {
              text: '+20.1% from last month',
              fontSize: 'Y2',
              color: 'green'
            }
          }
        },

        SubscriptionsCard: {
          Header: {
            extends: 'Flex',
            align: 'center space-between',
            Label: {
              text: 'Subscriptions',
              fontSize: 'Z',
              color: 'caption',
              fontWeight: '500'
            },
            Icon: { name: 'users', boxSize: 'A', color: 'blue' }
          },
          Value: {
            text: '+2,350',
            fontSize: 'B1',
            fontWeight: '700',
            color: 'title'
          },
          Change: {
            extends: 'Flex',
            align: 'center',
            gap: 'X',
            Icon: { name: 'arrowUp', boxSize: 'Y2', color: 'green' },
            Text: {
              text: '+180.1% from last month',
              fontSize: 'Y2',
              color: 'green'
            }
          }
        },

        SalesCard: {
          Header: {
            extends: 'Flex',
            align: 'center space-between',
            Label: {
              text: 'Sales',
              fontSize: 'Z',
              color: 'caption',
              fontWeight: '500'
            },
            Icon: { name: 'creditCard', boxSize: 'A', color: 'purple' }
          },
          Value: {
            text: '+12,234',
            fontSize: 'B1',
            fontWeight: '700',
            color: 'title'
          },
          Change: {
            extends: 'Flex',
            align: 'center',
            gap: 'X',
            Icon: { name: 'arrowUp', boxSize: 'Y2', color: 'green' },
            Text: {
              text: '+19% from last month',
              fontSize: 'Y2',
              color: 'green'
            }
          }
        },

        ActiveUsersCard: {
          Header: {
            extends: 'Flex',
            align: 'center space-between',
            Label: {
              text: 'Active Now',
              fontSize: 'Z',
              color: 'caption',
              fontWeight: '500'
            },
            Icon: { name: 'activity', boxSize: 'A', color: 'orange' }
          },
          Value: {
            text: '573',
            fontSize: 'B1',
            fontWeight: '700',
            color: 'title'
          },
          Change: {
            extends: 'Flex',
            align: 'center',
            gap: 'X',
            Icon: { name: 'arrowDown', boxSize: 'Y2', color: 'red' },
            Text: { text: '-3.2% from last hour', fontSize: 'Y2', color: 'red' }
          }
        }
      },

      // ── Charts Section ──
      ChartsRow: {
        extends: 'Grid',
        columns: '2fr 1fr',
        gap: 'A',
        '@tablet': { columns: '1fr' },

        MainChart: {
          extends: 'Flex',
          flow: 'y',
          background: 'gray2',
          borderRadius: 'A',
          border: 'line 1px solid',
          overflow: 'hidden',

          ChartHeader: {
            extends: 'Flex',
            align: 'center space-between',
            padding: 'A1',
            borderWidth: '0 0 1px 0',
            borderStyle: 'solid',
            borderColor: 'line',

            Left: {
              extends: 'Flex',
              flow: 'y',
              gap: 'X',
              Title: {
                text: 'Revenue Analytics',
                fontSize: 'A',
                fontWeight: '600',
                color: 'title'
              },
              Subtitle: {
                text: 'Monthly revenue breakdown',
                fontSize: 'Z',
                color: 'caption'
              }
            },

            PeriodTabs: {
              extends: 'Flex',
              gap: 'X',
              background: 'gray3 0.3',
              padding: 'X',
              borderRadius: 'Y2',
              childExtends: 'Button',
              childProps: {
                theme: 'transparent',
                padding: 'Y Y2',
                fontSize: 'Y2',
                borderRadius: 'Y',
                fontWeight: '500',
                cursor: 'pointer'
              },
              Tab_24h: {
                text: '24h',
                onClick: (e, el, s) => s.update({ chartPeriod: '24h' })
              },
              Tab_7d: {
                text: '7d',
                onClick: (e, el, s) => s.update({ chartPeriod: '7d' })
              },
              Tab_30d: {
                text: '30d',
                onClick: (e, el, s) => s.update({ chartPeriod: '30d' })
              },
              Tab_90d: {
                text: '90d',
                onClick: (e, el, s) => s.update({ chartPeriod: '90d' })
              }
            }
          },

          ChartCanvas: {
            tag: 'canvas',
            minHeight: 'E',
            padding: 'A1',
            onRender: async (el, s) => {
              const { Chart } = await import('chart.js')
              const ctx = el.node.getContext('2d')
              const chart = new Chart(ctx, {
                type: 'line',
                data: {
                  labels: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                  ],
                  datasets: [
                    {
                      label: 'Revenue',
                      data: [
                        4000, 3000, 5000, 4500, 6000, 5500, 7000, 8000, 7500,
                        9000, 8500, 10000
                      ],
                      borderColor: '#3b82f6',
                      tension: 0.4,
                      fill: true
                    }
                  ]
                },
                options: { responsive: true, maintainAspectRatio: false }
              })
              return () => chart.destroy()
            }
          }
        },

        SideChart: {
          extends: 'Flex',
          flow: 'y',
          background: 'gray2',
          borderRadius: 'A',
          border: 'line 1px solid',
          overflow: 'hidden',

          ChartHeader: {
            extends: 'Flex',
            flow: 'y',
            gap: 'X',
            padding: 'A1',
            borderWidth: '0 0 1px 0',
            borderStyle: 'solid',
            borderColor: 'line',
            Title: {
              text: 'Traffic Sources',
              fontSize: 'A',
              fontWeight: '600',
              color: 'title'
            },
            Subtitle: {
              text: 'Top channels this month',
              fontSize: 'Z',
              color: 'caption'
            }
          },

          Items: {
            extends: 'Flex',
            flow: 'y',
            padding: 'A1',
            gap: 'Z2',

            childExtends: 'Flex',
            childProps: {
              align: 'center space-between',
              padding: 'Z',
              borderRadius: 'Y2',
              ':hover': { background: 'gray3 0.2' }
            },

            DirectItem: {
              Label: {
                extends: 'Flex',
                align: 'center',
                gap: 'Z',
                Dot: { boxSize: 'Y', borderRadius: 'Y', background: 'blue' },
                Text: { text: 'Direct', fontSize: 'Z2', color: 'title' }
              },
              Value: {
                text: '42%',
                fontSize: 'Z2',
                fontWeight: '600',
                color: 'title'
              }
            },
            OrganicItem: {
              Label: {
                extends: 'Flex',
                align: 'center',
                gap: 'Z',
                Dot: { boxSize: 'Y', borderRadius: 'Y', background: 'green' },
                Text: { text: 'Organic', fontSize: 'Z2', color: 'title' }
              },
              Value: {
                text: '28%',
                fontSize: 'Z2',
                fontWeight: '600',
                color: 'title'
              }
            },
            ReferralItem: {
              Label: {
                extends: 'Flex',
                align: 'center',
                gap: 'Z',
                Dot: { boxSize: 'Y', borderRadius: 'Y', background: 'purple' },
                Text: { text: 'Referral', fontSize: 'Z2', color: 'title' }
              },
              Value: {
                text: '18%',
                fontSize: 'Z2',
                fontWeight: '600',
                color: 'title'
              }
            },
            SocialItem: {
              Label: {
                extends: 'Flex',
                align: 'center',
                gap: 'Z',
                Dot: { boxSize: 'Y', borderRadius: 'Y', background: 'orange' },
                Text: { text: 'Social', fontSize: 'Z2', color: 'title' }
              },
              Value: {
                text: '12%',
                fontSize: 'Z2',
                fontWeight: '600',
                color: 'title'
              }
            }
          }
        }
      },

      // ── Data Table Section ──
      TableSection: {
        extends: 'Flex',
        flow: 'y',
        background: 'gray2',
        borderRadius: 'A',
        border: 'line 1px solid',
        overflow: 'hidden',

        TableHeader: {
          extends: 'Flex',
          align: 'center space-between',
          padding: 'A1',
          borderWidth: '0 0 1px 0',
          borderStyle: 'solid',
          borderColor: 'line',
          flexWrap: 'wrap',
          gap: 'Z2',

          Left: {
            extends: 'Flex',
            flow: 'y',
            gap: 'X',
            Title: {
              text: 'Recent Transactions',
              fontSize: 'A',
              fontWeight: '600',
              color: 'title'
            },
            Subtitle: {
              text: 'Showing latest 25 transactions',
              fontSize: 'Z',
              color: 'caption'
            }
          },

          Controls: {
            extends: 'Flex',
            align: 'center',
            gap: 'Z',

            FilterButton: {
              extends: 'Button',
              icon: 'filter',
              text: 'Filter',
              theme: 'transparent',
              padding: 'Y2 Z2',
              fontSize: 'Z',
              borderRadius: 'Z',
              border: 'line 1px solid',
              gap: 'Y'
            },

            SearchInput: {
              extends: 'Flex',
              background: 'gray3 0.3',
              borderRadius: 'Z',
              padding: 'Y2 Z2',
              align: 'center',
              gap: 'Y',
              border: 'line 1px solid',
              ':focus-within': { borderColor: 'blue 0.5' },
              Icon: { name: 'search', boxSize: 'Z2', color: 'caption' },
              Input: {
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'title',
                fontSize: 'Z',
                placeholder: 'Search transactions...',
                width: 'D'
              }
            }
          }
        },

        Table: {
          tag: 'table',
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 'Z',

          style: {
            minWidth: '600px',
            tableLayout: 'fixed'
          },

          Thead: {
            tag: 'thead',
            Row: {
              tag: 'tr',
              background: 'gray3 0.15',

              childExtends: 'Text',
              childProps: {
                tag: 'th',
                padding: 'Z A1',
                textAlign: 'left',
                fontWeight: '600',
                fontSize: 'Y2',
                color: 'caption',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                userSelect: 'none',
                ':hover': { color: 'title' }
              },

              NameHeader: { text: 'Name' },
              EmailHeader: { text: 'Email' },
              AmountHeader: { text: 'Amount' },
              StatusHeader: { text: 'Status' },
              DateHeader: { text: 'Date' },
              ActionsHeader: { text: 'Actions', textAlign: 'right' }
            }
          },

          Tbody: {
            tag: 'tbody',
            children: (el, s) => s.root.transactions || [],
            childrenAs: 'state',
            childExtends: {
              tag: 'tr',
              transition: 'background 0.1s ease',
              ':hover': { background: 'gray3 0.15' },

              childProps: {
                tag: 'td',
                padding: 'Z A1',
                borderWidth: '1px 0 0 0',
                borderStyle: 'solid',
                borderColor: 'line',
                verticalAlign: 'middle'
              },

              NameCell: {
                extends: 'Flex',
                tag: 'td',
                align: 'center',
                gap: 'Z',
                padding: 'Z A1',
                borderWidth: '1px 0 0 0',
                borderStyle: 'solid',
                borderColor: 'line',
                Avatar: {
                  boxSize: 'B',
                  borderRadius: 'Z',
                  background: 'blue 0.15',
                  color: 'blue',
                  extends: 'Flex',
                  align: 'center center',
                  fontSize: 'Z',
                  fontWeight: '600',
                  text: (el, s) => s.name?.charAt(0) || '?'
                },
                Text: {
                  text: (el, s) => s.name,
                  fontWeight: '500',
                  color: 'title'
                }
              },
              EmailCell: { text: (el, s) => s.email, color: 'caption' },
              AmountCell: {
                text: (el, s) => s.amount,
                fontWeight: '600',
                color: 'title'
              },
              StatusCell: {
                tag: 'td',
                padding: 'Z A1',
                borderWidth: '1px 0 0 0',
                borderStyle: 'solid',
                borderColor: 'line',
                Badge: {
                  extends: 'Text',
                  text: (el, s) => s.status,
                  padding: 'X Y2',
                  borderRadius: 'Y',
                  fontSize: 'Y2',
                  fontWeight: '500',
                  isCompleted: (el, s) => s.status === 'Completed',
                  isPending: (el, s) => s.status === 'Pending',
                  isFailed: (el, s) => s.status === 'Failed',
                  '.isCompleted': { background: 'green 0.15', color: 'green' },
                  '.isPending': { background: 'orange 0.15', color: 'orange' },
                  '.isFailed': { background: 'red 0.15', color: 'red' }
                }
              },
              DateCell: { text: (el, s) => s.date, color: 'caption' },
              ActionsCell: {
                tag: 'td',
                textAlign: 'right',
                padding: 'Z A1',
                borderWidth: '1px 0 0 0',
                borderStyle: 'solid',
                borderColor: 'line',
                extends: 'Flex',
                align: 'center',
                justifyContent: 'flex-end',
                gap: 'Y',
                ViewButton: {
                  extends: 'IconButton',
                  icon: 'eye',
                  theme: 'transparent',
                  padding: 'X',
                  borderRadius: 'Y',
                  ':hover': { background: 'blue 0.1' }
                },
                EditButton: {
                  extends: 'IconButton',
                  icon: 'edit',
                  theme: 'transparent',
                  padding: 'X',
                  borderRadius: 'Y',
                  ':hover': { background: 'green 0.1' }
                },
                DeleteButton: {
                  extends: 'IconButton',
                  icon: 'trash',
                  theme: 'transparent',
                  padding: 'X',
                  borderRadius: 'Y',
                  ':hover': { background: 'red 0.1' },
                  onClick: (e, el, s) => {
                    el.call('deleteTransaction', s.id)
                  }
                }
              }
            }
          }
        },

        // ── Table Footer / Pagination ──
        TableFooter: {
          extends: 'Flex',
          align: 'center space-between',
          padding: 'Z2 A1',
          borderWidth: '1px 0 0 0',
          borderStyle: 'solid',
          borderColor: 'line',
          '@mobile': { flexDirection: 'column', gap: 'Z' },

          Info: {
            extends: 'Text',
            text: (el, s) =>
              `Showing ${(s.currentPage - 1) * s.pageSize + 1} to ${Math.min(s.currentPage * s.pageSize, 100)} of 100 entries`,
            fontSize: 'Z',
            color: 'caption'
          },

          PaginationControls: {
            extends: 'Flex',
            align: 'center',
            gap: 'Y',

            PrevButton: {
              extends: 'Button',
              text: 'Previous',
              theme: 'transparent',
              padding: 'Y Y2',
              fontSize: 'Z',
              borderRadius: 'Y2',
              border: 'line 1px solid',
              disabled: (el, s) => s.currentPage <= 1,
              onClick: (e, el, s) =>
                s.update({ currentPage: s.currentPage - 1 })
            },

            PageNumbers: {
              extends: 'Flex',
              gap: 'X',
              children: (el, s) => {
                const pages = []
                for (let i = 1; i <= 4; i++) pages.push({ page: i })
                return pages
              },
              childrenAs: 'state',
              childExtends: 'Button',
              childProps: {
                theme: 'transparent',
                padding: 'Y Y2',
                fontSize: 'Z',
                borderRadius: 'Y2',
                minWidth: 'B',
                textAlign: 'center',
                text: (el, s) => String(s.page),
                isActive: (el, s) => s.page === s.root.currentPage,
                '.isActive': { background: 'blue', color: 'white' },
                onClick: (e, el, s) => s.root.update({ currentPage: s.page })
              }
            },

            NextButton: {
              extends: 'Button',
              text: 'Next',
              theme: 'transparent',
              padding: 'Y Y2',
              fontSize: 'Z',
              borderRadius: 'Y2',
              border: 'line 1px solid',
              disabled: (el, s) => s.currentPage >= 4,
              onClick: (e, el, s) =>
                s.update({ currentPage: s.currentPage + 1 })
            }
          }
        }
      },

      // ── Recent Activity Feed ──
      ActivitySection: {
        extends: 'Flex',
        flow: 'y',
        background: 'gray2',
        borderRadius: 'A',
        border: 'line 1px solid',
        padding: 'A1',
        gap: 'A',

        Header: {
          extends: 'Flex',
          align: 'center space-between',
          Title: {
            text: 'Recent Activity',
            fontSize: 'A',
            fontWeight: '600',
            color: 'title'
          },
          ViewAll: {
            extends: 'Link',
            text: 'View all',
            href: '/activity',
            color: 'blue',
            fontSize: 'Z',
            ':hover': { textDecoration: 'underline' }
          }
        },

        Feed: {
          extends: 'Flex',
          flow: 'y',
          gap: 'Z2',

          childExtends: 'Flex',
          childProps: {
            gap: 'Z',
            padding: 'Z',
            borderRadius: 'Z',
            ':hover': { background: 'gray3 0.15' }
          },

          Activity_1: {
            Indicator: {
              boxSize: 'B',
              borderRadius: 'Z',
              background: 'green 0.15',
              extends: 'Flex',
              align: 'center center',
              flexShrink: '0',
              Icon: { name: 'check', boxSize: 'Z2', color: 'green' }
            },
            Details: {
              extends: 'Flex',
              flow: 'y',
              gap: 'X',
              Title: {
                text: 'Payment received from Acme Corp',
                fontSize: 'Z2',
                fontWeight: '500',
                color: 'title'
              },
              Time: { text: '2 minutes ago', fontSize: 'Y2', color: 'caption' }
            },
            Amount: {
              text: '+$1,200.00',
              fontSize: 'Z2',
              fontWeight: '600',
              color: 'green',
              marginLeft: 'auto'
            }
          },

          Activity_2: {
            Indicator: {
              boxSize: 'B',
              borderRadius: 'Z',
              background: 'blue 0.15',
              extends: 'Flex',
              align: 'center center',
              flexShrink: '0',
              Icon: { name: 'userPlus', boxSize: 'Z2', color: 'blue' }
            },
            Details: {
              extends: 'Flex',
              flow: 'y',
              gap: 'X',
              Title: {
                text: 'New team member added: Sarah Wilson',
                fontSize: 'Z2',
                fontWeight: '500',
                color: 'title'
              },
              Time: { text: '15 minutes ago', fontSize: 'Y2', color: 'caption' }
            }
          },

          Activity_3: {
            Indicator: {
              boxSize: 'B',
              borderRadius: 'Z',
              background: 'orange 0.15',
              extends: 'Flex',
              align: 'center center',
              flexShrink: '0',
              Icon: { name: 'alertTriangle', boxSize: 'Z2', color: 'orange' }
            },
            Details: {
              extends: 'Flex',
              flow: 'y',
              gap: 'X',
              Title: {
                text: 'Server CPU usage reached 85%',
                fontSize: 'Z2',
                fontWeight: '500',
                color: 'title'
              },
              Time: { text: '1 hour ago', fontSize: 'Y2', color: 'caption' }
            }
          },

          Activity_4: {
            Indicator: {
              boxSize: 'B',
              borderRadius: 'Z',
              background: 'purple 0.15',
              extends: 'Flex',
              align: 'center center',
              flexShrink: '0',
              Icon: { name: 'gitBranch', boxSize: 'Z2', color: 'purple' }
            },
            Details: {
              extends: 'Flex',
              flow: 'y',
              gap: 'X',
              Title: {
                text: 'Deployment v2.4.1 completed successfully',
                fontSize: 'Z2',
                fontWeight: '500',
                color: 'title'
              },
              Time: { text: '3 hours ago', fontSize: 'Y2', color: 'caption' }
            }
          },

          Activity_5: {
            Indicator: {
              boxSize: 'B',
              borderRadius: 'Z',
              background: 'red 0.15',
              extends: 'Flex',
              align: 'center center',
              flexShrink: '0',
              Icon: { name: 'xCircle', boxSize: 'Z2', color: 'red' }
            },
            Details: {
              extends: 'Flex',
              flow: 'y',
              gap: 'X',
              Title: {
                text: 'Failed payment attempt - Invoice #1234',
                fontSize: 'Z2',
                fontWeight: '500',
                color: 'title'
              },
              Time: { text: '5 hours ago', fontSize: 'Y2', color: 'caption' }
            },
            Amount: {
              text: '-$450.00',
              fontSize: 'Z2',
              fontWeight: '600',
              color: 'red',
              marginLeft: 'auto'
            }
          }
        }
      }
    }
  },

  // ── Modal Overlay ──
  ModalOverlay: {
    extends: 'Flex',
    position: 'fixed',
    inset: '0',
    background: 'black 0.6',
    zIndex: 200,
    align: 'center center',
    opacity: (el, s) => (s.root.modalOpen ? '1' : '0'),
    visibility: (el, s) => (s.root.modalOpen ? 'visible' : 'hidden'),
    transition: 'opacity 0.2s ease, visibility 0.2s ease',
    backdropFilter: 'blur(4px)',
    onClick: (e, el, s) => s.root.update({ modalOpen: false }),

    ModalContent: {
      extends: 'Flex',
      flow: 'y',
      background: 'gray2',
      borderRadius: 'A',
      width: 'G2',
      maxWidth: '90vw',
      maxHeight: '80vh',
      overflow: 'auto',
      border: 'line 1px solid',
      boxShadow: 'black .30, 0px, 16px, 48px, 0px',
      onClick: (e) => e.stopPropagation(),

      ModalHeader: {
        extends: 'Flex',
        align: 'center space-between',
        padding: 'A1',
        borderWidth: '0 0 1px 0',
        borderStyle: 'solid',
        borderColor: 'line',
        Title: {
          text: 'Create New Item',
          fontSize: 'A1',
          fontWeight: '600',
          color: 'title'
        },
        CloseButton: {
          extends: 'IconButton',
          icon: 'x',
          theme: 'transparent',
          padding: 'Y',
          borderRadius: 'Y2',
          ':hover': { background: 'gray3 0.5' },
          onClick: (e, el, s) => s.root.update({ modalOpen: false })
        }
      },

      ModalBody: {
        extends: 'Flex',
        flow: 'y',
        padding: 'A1',
        gap: 'A',

        NameField: {
          extends: 'Flex',
          flow: 'y',
          gap: 'Y',
          Label: {
            tag: 'label',
            text: 'Name',
            fontSize: 'Z',
            fontWeight: '500',
            color: 'title'
          },
          Input: {
            padding: 'Z A',
            background: 'gray3 0.3',
            border: 'line 1px solid',
            borderRadius: 'Z',
            color: 'title',
            fontSize: 'Z2',
            outline: 'none',
            placeholder: 'Enter name...',
            ':focus': { borderColor: 'blue 0.5' }
          }
        },

        EmailField: {
          extends: 'Flex',
          flow: 'y',
          gap: 'Y',
          Label: {
            tag: 'label',
            text: 'Email',
            fontSize: 'Z',
            fontWeight: '500',
            color: 'title'
          },
          Input: {
            padding: 'Z A',
            background: 'gray3 0.3',
            border: 'line 1px solid',
            borderRadius: 'Z',
            color: 'title',
            fontSize: 'Z2',
            outline: 'none',
            type: 'email',
            placeholder: 'Enter email...',
            ':focus': { borderColor: 'blue 0.5' }
          }
        },

        StatusField: {
          extends: 'Flex',
          flow: 'y',
          gap: 'Y',
          Label: {
            tag: 'label',
            text: 'Status',
            fontSize: 'Z',
            fontWeight: '500',
            color: 'title'
          },
          Select: {
            tag: 'select',
            padding: 'Z A',
            background: 'gray3 0.3',
            border: 'line 1px solid',
            borderRadius: 'Z',
            color: 'title',
            fontSize: 'Z2',
            outline: 'none',
            cursor: 'pointer',
            children: [
              { tag: 'option', text: 'Active', value: 'active' },
              { tag: 'option', text: 'Pending', value: 'pending' },
              { tag: 'option', text: 'Inactive', value: 'inactive' }
            ]
          }
        },

        NotesField: {
          extends: 'Flex',
          flow: 'y',
          gap: 'Y',
          Label: {
            tag: 'label',
            text: 'Notes',
            fontSize: 'Z',
            fontWeight: '500',
            color: 'title'
          },
          Textarea: {
            tag: 'textarea',
            padding: 'Z A',
            background: 'gray3 0.3',
            border: 'line 1px solid',
            borderRadius: 'Z',
            color: 'title',
            fontSize: 'Z2',
            outline: 'none',
            minHeight: 'C2',
            resize: 'vertical',
            placeholder: 'Add notes...',
            ':focus': { borderColor: 'blue 0.5' }
          }
        }
      },

      ModalFooter: {
        extends: 'Flex',
        align: 'center',
        justifyContent: 'flex-end',
        gap: 'Z',
        padding: 'A1',
        borderWidth: '1px 0 0 0',
        borderStyle: 'solid',
        borderColor: 'line',

        CancelButton: {
          extends: 'Button',
          text: 'Cancel',
          theme: 'transparent',
          padding: 'Y2 A',
          fontSize: 'Z2',
          borderRadius: 'Z',
          border: 'line 1px solid',
          onClick: (e, el, s) => s.root.update({ modalOpen: false })
        },

        SaveButton: {
          extends: 'Button',
          text: 'Save',
          theme: 'primary',
          padding: 'Y2 A1',
          fontSize: 'Z2',
          fontWeight: '600',
          borderRadius: 'Z',
          onClick: (e, el, s) => {
            el.call('saveItem')
            s.root.update({ modalOpen: false })
          }
        }
      }
    }
  },

  // ── Footer ──
  Footer: {
    extends: 'Flex',
    tag: 'footer',
    align: 'center space-between',
    padding: 'A A2',
    borderWidth: '1px 0 0 0',
    borderStyle: 'solid',
    borderColor: 'line',
    fontSize: 'Z',
    color: 'caption',
    '@mobile': { flexDirection: 'column', gap: 'Z', textAlign: 'center' },

    Copyright: { text: '© 2026 Dashboard Inc. All rights reserved.' },
    Links: {
      extends: 'Flex',
      gap: 'A',
      Link_privacy: {
        extends: 'Link',
        text: 'Privacy Policy',
        href: '/privacy',
        color: 'caption',
        ':hover': { color: 'title' }
      },
      Link_terms: {
        extends: 'Link',
        text: 'Terms of Service',
        href: '/terms',
        color: 'caption',
        ':hover': { color: 'title' }
      },
      Link_support: {
        extends: 'Link',
        text: 'Support',
        href: '/support',
        color: 'caption',
        ':hover': { color: 'title' }
      }
    }
  }
}
