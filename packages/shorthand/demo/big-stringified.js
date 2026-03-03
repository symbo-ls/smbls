// Stringified DashboardPage (stringify)
export const DashboardPage = {
  st: {
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
    dateRange: {
      start: null,
      end: null
    },
    chartPeriod: '7d',
    theme: 'dark'
  },
  "@dark": {
    in: 'bg:gray1 c:white'
  },
  "@light": {
    in: 'bg:white c:gray1'
  },
  TopNav: {
    zi: 100,
    bxsh: 'black .10, 0px, 2px, 8px, 0px',
    "@mobile": {
      in: 'p:Y2_A'
    },
    "@tablet": {
      in: 'p:Z_A1'
    },
    ":hover": {
      in: 'bg:gray2_1_+2'
    },
    LeftSection: {
      MenuButton: {
        "@tablet": {
          in: 'd:flex'
        },
        "@ck": (e, el, s) => s.update({ sidebarOpen: !s.sidebarOpen }),
        in: 'ext:IconButton ico:menu thm:transparent p:Y2 bdr:Z cur:pointer d:none'
      },
      Logo: {
        Icon: {
          in: 'nm:logo bsz:B1'
        },
        Title: {
          tx: 'Dashboard',
          "@mobile": {
            in: 'd:none'
          },
          in: 'tg:strong fs:A1 fw:700 ls:-0.02em'
        },
        in: 'ext:Flex aln:center g:Y2 cur:pointer'
      },
      in: 'ext:Flex aln:center g:A'
    },
    CenterSection: {
      "@mobile": {
        in: 'd:none'
      },
      SearchBar: {
        trn: 'background 0.15s ease, border-color 0.15s ease',
        ":focus-within": {
          in: 'bg:gray3_0.8 bdc:blue_0.5'
        },
        Icon: {
          in: 'nm:search bsz:A c:caption op:0.6'
        },
        Input: {
          phd: 'Search anything...',
          "@ip": (e, el, s) => s.update({ searchQuery: e.target.value }),
          in: 'bg:transparent bd:none ol:none c:title fx:1 fs:Z2'
        },
        Shortcut: {
          tx: '⌘K',
          in: 'ext:Text fs:Y2 p:X_Y2 bg:gray3_0.3 bdr:Y c:caption'
        },
        in: 'ext:Flex w:100% bg:gray3_0.5 bdr:A p:Y2_A aln:center g:Y2 bd:gray3_1px_solid'
      },
      in: 'ext:Flex fx:1 mxw:G m:-_A2'
    },
    RightSection: {
      NotificationBell: {
        ":hover": {
          in: 'bg:gray3_0.5'
        },
        Badge: {
          tx: (el, s) => String(s.root.notifications?.length || 0),
          hd: (el, s) => !s.root.notifications?.length,
          in: 'ext:Text pos:absolute tp:-X rgt:-X bg:red c:white fs:X p:X_Y bdr:Z mnw:Z ta:center'
        },
        in: 'ext:IconButton ico:bell thm:transparent pos:relative p:Y2 bdr:Z'
      },
      ThemeToggle: {
        ico: (el, s) => (s.root.theme === 'dark' ? 'sun' : 'moon'),
        ":hover": {
          in: 'bg:gray3_0.5'
        },
        "@ck": (e, el, s) => {
                  s.root.update({ theme: s.root.theme === 'dark' ? 'light' : 'dark' })
                },
        in: 'ext:IconButton thm:transparent p:Y2 bdr:Z'
      },
      UserMenu: {
        ":hover": {
          in: 'bg:gray3_0.3'
        },
        Avatar: {
          src: 'user-avatar.png',
          in: 'bsz:B bdr:Z obf:cover'
        },
        Name: {
          tx: 'John Doe',
          "@mobile": {
            in: 'd:none'
          },
          in: 'ext:Text fs:Z2 fw:500'
        },
        Icon: {
          in: 'nm:chevronDown bsz:Y2 c:caption'
        },
        in: 'ext:Flex aln:center g:Y2 cur:pointer p:X_Y2 bdr:Z'
      },
      in: 'ext:Flex aln:center g:Z2'
    },
    in: 'ext:Flex tg:header p:Z2_A2 bg:gray2 aln:center_space-between pos:sticky tp:0 bdw:0_0_1px_0 bdst:solid bdc:line trn:background_0.2s_ease'
  },
  MainLayout: {
    Sidebar: {
      trn: 'transform 0.25s ease, width 0.25s ease',
      zi: 50,
      "@tablet": {
        bxsh: 'black .20, 4px, 0, 16px, 0',
        in: 'pos:absolute tp:0 lft:0 h:100%'
      },
      hd: (el, s) => {
              if (typeof window !== 'undefined' && window.innerWidth < 768) {
                return !s.sidebarOpen
              }
              return false
            },
      NavSection: {
        SectionLabel: {
          tx: 'MAIN',
          in: 'ext:Text fs:X fw:700 ls:0.08em c:caption p:Y2_A tt:uppercase'
        },
        cp: {
          trn: 'background 0.15s ease, color 0.15s ease',
          ":hover": {
            in: 'bg:gray3_0.3 c:title'
          },
          in: 'aln:center g:Z p:Z_A bdr:Z cur:pointer c:caption fs:Z2 fw:500'
        },
        OverviewLink: {
          Icon: {
            in: 'nm:dashboard bsz:A'
          },
          Label: {
            tx: 'Overview'
          },
          isActive: (el, s) => s.activeTab === 'overview',
          ".isActive": {
            in: 'bg:blue_0.15 c:blue'
          },
          "@ck": (e, el, s) => s.update({ activeTab: 'overview' })
        },
        AnalyticsLink: {
          Icon: {
            in: 'nm:chart bsz:A'
          },
          Label: {
            tx: 'Analytics'
          },
          isActive: (el, s) => s.activeTab === 'analytics',
          ".isActive": {
            in: 'bg:blue_0.15 c:blue'
          },
          "@ck": (e, el, s) => s.update({ activeTab: 'analytics' })
        },
        ProjectsLink: {
          Icon: {
            in: 'nm:folder bsz:A'
          },
          Label: {
            tx: 'Projects'
          },
          isActive: (el, s) => s.activeTab === 'projects',
          ".isActive": {
            in: 'bg:blue_0.15 c:blue'
          },
          "@ck": (e, el, s) => s.update({ activeTab: 'projects' })
        },
        TeamLink: {
          Icon: {
            in: 'nm:users bsz:A'
          },
          Label: {
            tx: 'Team'
          },
          isActive: (el, s) => s.activeTab === 'team',
          ".isActive": {
            in: 'bg:blue_0.15 c:blue'
          },
          "@ck": (e, el, s) => s.update({ activeTab: 'team' })
        },
        MessagesLink: {
          Icon: {
            in: 'nm:message bsz:A'
          },
          Label: {
            tx: 'Messages'
          },
          isActive: (el, s) => s.activeTab === 'messages',
          ".isActive": {
            in: 'bg:blue_0.15 c:blue'
          },
          "@ck": (e, el, s) => s.update({ activeTab: 'messages' })
        },
        in: 'ext:Flex fl:y p:0_Z2 g:X cex:Flex'
      },
      NavSection_settings: {
        SectionLabel: {
          tx: 'SETTINGS',
          in: 'ext:Text fs:X fw:700 ls:0.08em c:caption p:Y2_A tt:uppercase'
        },
        ProfileLink: {
          ":hover": {
            in: 'bg:gray3_0.3 c:title'
          },
          Icon: {
            in: 'nm:user bsz:A'
          },
          Label: {
            tx: 'Profile'
          },
          in: 'ext:Flex aln:center g:Z p:Z_A bdr:Z cur:pointer c:caption fs:Z2 fw:500 trn:background_0.15s_ease'
        },
        BillingLink: {
          ":hover": {
            in: 'bg:gray3_0.3 c:title'
          },
          Icon: {
            in: 'nm:creditCard bsz:A'
          },
          Label: {
            tx: 'Billing'
          },
          in: 'ext:Flex aln:center g:Z p:Z_A bdr:Z cur:pointer c:caption fs:Z2 fw:500 trn:background_0.15s_ease'
        },
        SecurityLink: {
          ":hover": {
            in: 'bg:gray3_0.3 c:title'
          },
          Icon: {
            in: 'nm:shield bsz:A'
          },
          Label: {
            tx: 'Security'
          },
          in: 'ext:Flex aln:center g:Z p:Z_A bdr:Z cur:pointer c:caption fs:Z2 fw:500 trn:background_0.15s_ease'
        },
        in: 'ext:Flex fl:y p:0_Z2 g:X mt:B'
      },
      in: 'ext:Flex tg:aside fl:y w:F1 mnw:F1 bg:gray2 bdw:0_1px_0_0 bdst:solid bdc:line p:A_0 ov:auto'
    },
    Content: {
      "@mobile": {
        in: 'p:A'
      },
      "@tablet": {
        in: 'p:A1'
      },
      PageHeader: {
        Left: {
          H1: {
            tx: 'Overview',
            "@mobile": {
              in: 'fs:B'
            },
            in: 'fs:C fw:700 ls:-0.03em c:title'
          },
          Breadcrumb: {
            Link_home: {
              tx: 'Home',
              hrf: '/',
              ":hover": {
                in: 'td:underline'
              },
              in: 'c:blue'
            },
            Separator: {
              tx: '/'
            },
            Current: {
              tx: 'Overview',
              in: 'fw:500'
            },
            in: 'ext:Flex aln:center g:Y c:caption fs:Z'
          },
          in: 'ext:Flex fl:y g:Y'
        },
        Right: {
          "@mobile": {
            in: 'w:100% jc:space-between'
          },
          DateRangeButton: {
            tx: 'Last 7 days',
            in: 'ext:Button ico:calendar thm:field p:Y2_A fs:Z2 bdr:Z g:Y2'
          },
          ExportButton: {
            tx: 'Export',
            ":hover": {
              in: 'bg:gray3_0.3'
            },
            in: 'ext:Button ico:download thm:transparent p:Y2_A fs:Z2 bdr:Z g:Y2'
          },
          CreateButton: {
            tx: 'Create New',
            "@ck": (e, el, s) =>
                          s.root.update({ modalOpen: true, modalType: 'create' }),
            in: 'ext:Button ico:plus thm:primary p:Y2_A1 fs:Z2 fw:600 bdr:Z g:Y2'
          },
          in: 'ext:Flex aln:center g:Z2'
        },
        in: 'ext:Flex aln:center_space-between fxw:wrap g:A'
      },
      StatsGrid: {
        col: 'repeat(4, 1fr)',
        "@tablet": {
          col: 'repeat(2, 1fr)'
        },
        "@mobile": {
          in: 'col:1fr'
        },
        cp: {
          trn: 'border-color 0.15s ease, box-shadow 0.15s ease',
          ":hover": {
            bxsh: 'blue .05, 0px, 0px, 0px, 4px',
            in: 'bdc:blue_0.3'
          },
          in: 'fl:y p:A1 bg:gray2 bdr:A g:Z bd:line_1px_solid'
        },
        RevenueCard: {
          Header: {
            Label: {
              tx: 'Total Revenue',
              in: 'fs:Z c:caption fw:500'
            },
            Icon: {
              in: 'nm:dollarSign bsz:A c:green'
            },
            in: 'ext:Flex aln:center_space-between'
          },
          Value: {
            tx: '$45,231.89',
            in: 'fs:B1 fw:700 c:title'
          },
          Change: {
            Icon: {
              in: 'nm:arrowUp bsz:Y2 c:green'
            },
            Text: {
              tx: '+20.1% from last month',
              in: 'fs:Y2 c:green'
            },
            in: 'ext:Flex aln:center g:X'
          }
        },
        SubscriptionsCard: {
          Header: {
            Label: {
              tx: 'Subscriptions',
              in: 'fs:Z c:caption fw:500'
            },
            Icon: {
              in: 'nm:users bsz:A c:blue'
            },
            in: 'ext:Flex aln:center_space-between'
          },
          Value: {
            tx: '+2,350',
            in: 'fs:B1 fw:700 c:title'
          },
          Change: {
            Icon: {
              in: 'nm:arrowUp bsz:Y2 c:green'
            },
            Text: {
              tx: '+180.1% from last month',
              in: 'fs:Y2 c:green'
            },
            in: 'ext:Flex aln:center g:X'
          }
        },
        SalesCard: {
          Header: {
            Label: {
              tx: 'Sales',
              in: 'fs:Z c:caption fw:500'
            },
            Icon: {
              in: 'nm:creditCard bsz:A c:purple'
            },
            in: 'ext:Flex aln:center_space-between'
          },
          Value: {
            tx: '+12,234',
            in: 'fs:B1 fw:700 c:title'
          },
          Change: {
            Icon: {
              in: 'nm:arrowUp bsz:Y2 c:green'
            },
            Text: {
              tx: '+19% from last month',
              in: 'fs:Y2 c:green'
            },
            in: 'ext:Flex aln:center g:X'
          }
        },
        ActiveUsersCard: {
          Header: {
            Label: {
              tx: 'Active Now',
              in: 'fs:Z c:caption fw:500'
            },
            Icon: {
              in: 'nm:activity bsz:A c:orange'
            },
            in: 'ext:Flex aln:center_space-between'
          },
          Value: {
            tx: '573',
            in: 'fs:B1 fw:700 c:title'
          },
          Change: {
            Icon: {
              in: 'nm:arrowDown bsz:Y2 c:red'
            },
            Text: {
              tx: '-3.2% from last hour',
              in: 'fs:Y2 c:red'
            },
            in: 'ext:Flex aln:center g:X'
          }
        },
        in: 'ext:Grid g:A cex:Flex'
      },
      ChartsRow: {
        "@tablet": {
          in: 'col:1fr'
        },
        MainChart: {
          ChartHeader: {
            Left: {
              Title: {
                tx: 'Revenue Analytics',
                in: 'fs:A fw:600 c:title'
              },
              Subtitle: {
                tx: 'Monthly revenue breakdown',
                in: 'fs:Z c:caption'
              },
              in: 'ext:Flex fl:y g:X'
            },
            PeriodTabs: {
              cp: {
                in: 'thm:transparent p:Y_Y2 fs:Y2 bdr:Y fw:500 cur:pointer'
              },
              Tab_24h: {
                tx: '24h',
                "@ck": (e, el, s) => s.update({ chartPeriod: '24h' })
              },
              Tab_7d: {
                tx: '7d',
                "@ck": (e, el, s) => s.update({ chartPeriod: '7d' })
              },
              Tab_30d: {
                tx: '30d',
                "@ck": (e, el, s) => s.update({ chartPeriod: '30d' })
              },
              Tab_90d: {
                tx: '90d',
                "@ck": (e, el, s) => s.update({ chartPeriod: '90d' })
              },
              in: 'ext:Flex g:X bg:gray3_0.3 p:X bdr:Y2 cex:Button'
            },
            in: 'ext:Flex aln:center_space-between p:A1 bdw:0_0_1px_0 bdst:solid bdc:line'
          },
          ChartCanvas: {
            "@rn": async (el, s) => {
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
                        },
            in: 'tg:canvas mnh:E p:A1'
          },
          in: 'ext:Flex fl:y bg:gray2 bdr:A bd:line_1px_solid ov:hidden'
        },
        SideChart: {
          ChartHeader: {
            Title: {
              tx: 'Traffic Sources',
              in: 'fs:A fw:600 c:title'
            },
            Subtitle: {
              tx: 'Top channels this month',
              in: 'fs:Z c:caption'
            },
            in: 'ext:Flex fl:y g:X p:A1 bdw:0_0_1px_0 bdst:solid bdc:line'
          },
          Items: {
            cp: {
              ":hover": {
                in: 'bg:gray3_0.2'
              },
              in: 'aln:center_space-between p:Z bdr:Y2'
            },
            DirectItem: {
              Label: {
                Dot: {
                  in: 'bsz:Y bdr:Y bg:blue'
                },
                Text: {
                  tx: 'Direct',
                  in: 'fs:Z2 c:title'
                },
                in: 'ext:Flex aln:center g:Z'
              },
              Value: {
                tx: '42%',
                in: 'fs:Z2 fw:600 c:title'
              }
            },
            OrganicItem: {
              Label: {
                Dot: {
                  in: 'bsz:Y bdr:Y bg:green'
                },
                Text: {
                  tx: 'Organic',
                  in: 'fs:Z2 c:title'
                },
                in: 'ext:Flex aln:center g:Z'
              },
              Value: {
                tx: '28%',
                in: 'fs:Z2 fw:600 c:title'
              }
            },
            ReferralItem: {
              Label: {
                Dot: {
                  in: 'bsz:Y bdr:Y bg:purple'
                },
                Text: {
                  tx: 'Referral',
                  in: 'fs:Z2 c:title'
                },
                in: 'ext:Flex aln:center g:Z'
              },
              Value: {
                tx: '18%',
                in: 'fs:Z2 fw:600 c:title'
              }
            },
            SocialItem: {
              Label: {
                Dot: {
                  in: 'bsz:Y bdr:Y bg:orange'
                },
                Text: {
                  tx: 'Social',
                  in: 'fs:Z2 c:title'
                },
                in: 'ext:Flex aln:center g:Z'
              },
              Value: {
                tx: '12%',
                in: 'fs:Z2 fw:600 c:title'
              }
            },
            in: 'ext:Flex fl:y p:A1 g:Z2 cex:Flex'
          },
          in: 'ext:Flex fl:y bg:gray2 bdr:A bd:line_1px_solid ov:hidden'
        },
        in: 'ext:Grid col:2fr_1fr g:A'
      },
      TableSection: {
        TableHeader: {
          Left: {
            Title: {
              tx: 'Recent Transactions',
              in: 'fs:A fw:600 c:title'
            },
            Subtitle: {
              tx: 'Showing latest 25 transactions',
              in: 'fs:Z c:caption'
            },
            in: 'ext:Flex fl:y g:X'
          },
          Controls: {
            FilterButton: {
              tx: 'Filter',
              in: 'ext:Button ico:filter thm:transparent p:Y2_Z2 fs:Z bdr:Z bd:line_1px_solid g:Y'
            },
            SearchInput: {
              ":focus-within": {
                in: 'bdc:blue_0.5'
              },
              Icon: {
                in: 'nm:search bsz:Z2 c:caption'
              },
              Input: {
                phd: 'Search transactions...',
                in: 'bg:transparent bd:none ol:none c:title fs:Z w:D'
              },
              in: 'ext:Flex bg:gray3_0.3 bdr:Z p:Y2_Z2 aln:center g:Y bd:line_1px_solid'
            },
            in: 'ext:Flex aln:center g:Z'
          },
          in: 'ext:Flex aln:center_space-between p:A1 bdw:0_0_1px_0 bdst:solid bdc:line fxw:wrap g:Z2'
        },
        Table: {
          sy: {
            minWidth: '600px',
            tableLayout: 'fixed'
          },
          Thead: {
            Row: {
              cp: {
                ":hover": {
                  in: 'c:title'
                },
                in: 'tg:th p:Z_A1 ta:left fw:600 fs:Y2 c:caption tt:uppercase ls:0.05em cur:pointer us:none'
              },
              NameHeader: {
                tx: 'Name'
              },
              EmailHeader: {
                tx: 'Email'
              },
              AmountHeader: {
                tx: 'Amount'
              },
              StatusHeader: {
                tx: 'Status'
              },
              DateHeader: {
                tx: 'Date'
              },
              ActionsHeader: {
                tx: 'Actions',
                in: 'ta:right'
              },
              in: 'tg:tr bg:gray3_0.15 cex:Text'
            },
            in: 'tg:thead'
          },
          Tbody: {
            ch: (el, s) => s.root.transactions || [],
            cex: {
              ":hover": {
                in: 'bg:gray3_0.15'
              },
              cp: {
                in: 'tg:td p:Z_A1 bdw:1px_0_0_0 bdst:solid bdc:line va:middle'
              },
              NameCell: {
                Avatar: {
                  tx: (el, s) => s.name?.charAt(0) || '?',
                  in: 'bsz:B bdr:Z bg:blue_0.15 c:blue ext:Flex aln:center_center fs:Z fw:600'
                },
                Text: {
                  tx: (el, s) => s.name,
                  in: 'fw:500 c:title'
                },
                in: 'ext:Flex tg:td aln:center g:Z p:Z_A1 bdw:1px_0_0_0 bdst:solid bdc:line'
              },
              EmailCell: {
                tx: (el, s) => s.email,
                in: 'c:caption'
              },
              AmountCell: {
                tx: (el, s) => s.amount,
                in: 'fw:600 c:title'
              },
              StatusCell: {
                Badge: {
                  tx: (el, s) => s.status,
                  isCompleted: (el, s) => s.status === 'Completed',
                  isPending: (el, s) => s.status === 'Pending',
                  isFailed: (el, s) => s.status === 'Failed',
                  ".isCompleted": {
                    in: 'bg:green_0.15 c:green'
                  },
                  ".isPending": {
                    in: 'bg:orange_0.15 c:orange'
                  },
                  ".isFailed": {
                    in: 'bg:red_0.15 c:red'
                  },
                  in: 'ext:Text p:X_Y2 bdr:Y fs:Y2 fw:500'
                },
                in: 'tg:td p:Z_A1 bdw:1px_0_0_0 bdst:solid bdc:line'
              },
              DateCell: {
                tx: (el, s) => s.date,
                in: 'c:caption'
              },
              ActionsCell: {
                ViewButton: {
                  ":hover": {
                    in: 'bg:blue_0.1'
                  },
                  in: 'ext:IconButton ico:eye thm:transparent p:X bdr:Y'
                },
                EditButton: {
                  ":hover": {
                    in: 'bg:green_0.1'
                  },
                  in: 'ext:IconButton ico:edit thm:transparent p:X bdr:Y'
                },
                DeleteButton: {
                  ":hover": {
                    in: 'bg:red_0.1'
                  },
                  "@ck": (e, el, s) => {
                                      el.call('deleteTransaction', s.id)
                                    },
                  in: 'ext:IconButton ico:trash thm:transparent p:X bdr:Y'
                },
                in: 'tg:td ta:right p:Z_A1 bdw:1px_0_0_0 bdst:solid bdc:line ext:Flex aln:center jc:flex-end g:Y'
              },
              in: 'tg:tr trn:background_0.1s_ease'
            },
            in: 'tg:tbody cha:state'
          },
          in: 'tg:table w:100% bdcl:collapse fs:Z'
        },
        TableFooter: {
          "@mobile": {
            in: 'fxd:column g:Z'
          },
          Info: {
            tx: (el, s) =>
                          `Showing ${(s.currentPage - 1) * s.pageSize + 1} to ${Math.min(s.currentPage * s.pageSize, 100)} of 100 entries`,
            in: 'ext:Text fs:Z c:caption'
          },
          PaginationControls: {
            PrevButton: {
              tx: 'Previous',
              dis: (el, s) => s.currentPage <= 1,
              "@ck": (e, el, s) =>
                              s.update({ currentPage: s.currentPage - 1 }),
              in: 'ext:Button thm:transparent p:Y_Y2 fs:Z bdr:Y2 bd:line_1px_solid'
            },
            PageNumbers: {
              ch: (el, s) => {
                              const pages = []
                              for (let i = 1; i <= 4; i++) pages.push({ page: i })
                              return pages
                            },
              cp: {
                tx: (el, s) => String(s.page),
                isActive: (el, s) => s.page === s.root.currentPage,
                ".isActive": {
                  in: 'bg:blue c:white'
                },
                "@ck": (e, el, s) => s.root.update({ currentPage: s.page }),
                in: 'thm:transparent p:Y_Y2 fs:Z bdr:Y2 mnw:B ta:center'
              },
              in: 'ext:Flex g:X cha:state cex:Button'
            },
            NextButton: {
              tx: 'Next',
              dis: (el, s) => s.currentPage >= 4,
              "@ck": (e, el, s) =>
                              s.update({ currentPage: s.currentPage + 1 }),
              in: 'ext:Button thm:transparent p:Y_Y2 fs:Z bdr:Y2 bd:line_1px_solid'
            },
            in: 'ext:Flex aln:center g:Y'
          },
          in: 'ext:Flex aln:center_space-between p:Z2_A1 bdw:1px_0_0_0 bdst:solid bdc:line'
        },
        in: 'ext:Flex fl:y bg:gray2 bdr:A bd:line_1px_solid ov:hidden'
      },
      ActivitySection: {
        Header: {
          Title: {
            tx: 'Recent Activity',
            in: 'fs:A fw:600 c:title'
          },
          ViewAll: {
            tx: 'View all',
            hrf: '/activity',
            ":hover": {
              in: 'td:underline'
            },
            in: 'ext:Link c:blue fs:Z'
          },
          in: 'ext:Flex aln:center_space-between'
        },
        Feed: {
          cp: {
            ":hover": {
              in: 'bg:gray3_0.15'
            },
            in: 'g:Z p:Z bdr:Z'
          },
          Activity_1: {
            Indicator: {
              Icon: {
                in: 'nm:check bsz:Z2 c:green'
              },
              in: 'bsz:B bdr:Z bg:green_0.15 ext:Flex aln:center_center fxs:0'
            },
            Details: {
              Title: {
                tx: 'Payment received from Acme Corp',
                in: 'fs:Z2 fw:500 c:title'
              },
              Time: {
                tx: '2 minutes ago',
                in: 'fs:Y2 c:caption'
              },
              in: 'ext:Flex fl:y g:X'
            },
            Amount: {
              tx: '+$1,200.00',
              in: 'fs:Z2 fw:600 c:green ml:auto'
            }
          },
          Activity_2: {
            Indicator: {
              Icon: {
                in: 'nm:userPlus bsz:Z2 c:blue'
              },
              in: 'bsz:B bdr:Z bg:blue_0.15 ext:Flex aln:center_center fxs:0'
            },
            Details: {
              Title: {
                tx: 'New team member added: Sarah Wilson',
                in: 'fs:Z2 fw:500 c:title'
              },
              Time: {
                tx: '15 minutes ago',
                in: 'fs:Y2 c:caption'
              },
              in: 'ext:Flex fl:y g:X'
            }
          },
          Activity_3: {
            Indicator: {
              Icon: {
                in: 'nm:alertTriangle bsz:Z2 c:orange'
              },
              in: 'bsz:B bdr:Z bg:orange_0.15 ext:Flex aln:center_center fxs:0'
            },
            Details: {
              Title: {
                tx: 'Server CPU usage reached 85%',
                in: 'fs:Z2 fw:500 c:title'
              },
              Time: {
                tx: '1 hour ago',
                in: 'fs:Y2 c:caption'
              },
              in: 'ext:Flex fl:y g:X'
            }
          },
          Activity_4: {
            Indicator: {
              Icon: {
                in: 'nm:gitBranch bsz:Z2 c:purple'
              },
              in: 'bsz:B bdr:Z bg:purple_0.15 ext:Flex aln:center_center fxs:0'
            },
            Details: {
              Title: {
                tx: 'Deployment v2.4.1 completed successfully',
                in: 'fs:Z2 fw:500 c:title'
              },
              Time: {
                tx: '3 hours ago',
                in: 'fs:Y2 c:caption'
              },
              in: 'ext:Flex fl:y g:X'
            }
          },
          Activity_5: {
            Indicator: {
              Icon: {
                in: 'nm:xCircle bsz:Z2 c:red'
              },
              in: 'bsz:B bdr:Z bg:red_0.15 ext:Flex aln:center_center fxs:0'
            },
            Details: {
              Title: {
                tx: 'Failed payment attempt - Invoice #1234',
                in: 'fs:Z2 fw:500 c:title'
              },
              Time: {
                tx: '5 hours ago',
                in: 'fs:Y2 c:caption'
              },
              in: 'ext:Flex fl:y g:X'
            },
            Amount: {
              tx: '-$450.00',
              in: 'fs:Z2 fw:600 c:red ml:auto'
            }
          },
          in: 'ext:Flex fl:y g:Z2 cex:Flex'
        },
        in: 'ext:Flex fl:y bg:gray2 bdr:A bd:line_1px_solid p:A1 g:A'
      },
      in: 'ext:Flex fl:y fx:1 ov:auto p:A2 g:A2'
    },
    in: 'ext:Flex fx:1 ov:hidden'
  },
  ModalOverlay: {
    zi: 200,
    op: (el, s) => (s.root.modalOpen ? '1' : '0'),
    vis: (el, s) => (s.root.modalOpen ? 'visible' : 'hidden'),
    trn: 'opacity 0.2s ease, visibility 0.2s ease',
    "@ck": (e, el, s) => s.root.update({ modalOpen: false }),
    ModalContent: {
      bxsh: 'black .30, 0px, 16px, 48px, 0px',
      "@ck": (e) => e.stopPropagation(),
      ModalHeader: {
        Title: {
          tx: 'Create New Item',
          in: 'fs:A1 fw:600 c:title'
        },
        CloseButton: {
          ":hover": {
            in: 'bg:gray3_0.5'
          },
          "@ck": (e, el, s) => s.root.update({ modalOpen: false }),
          in: 'ext:IconButton ico:x thm:transparent p:Y bdr:Y2'
        },
        in: 'ext:Flex aln:center_space-between p:A1 bdw:0_0_1px_0 bdst:solid bdc:line'
      },
      ModalBody: {
        NameField: {
          Label: {
            tx: 'Name',
            in: 'tg:label fs:Z fw:500 c:title'
          },
          Input: {
            phd: 'Enter name...',
            ":focus": {
              in: 'bdc:blue_0.5'
            },
            in: 'p:Z_A bg:gray3_0.3 bd:line_1px_solid bdr:Z c:title fs:Z2 ol:none'
          },
          in: 'ext:Flex fl:y g:Y'
        },
        EmailField: {
          Label: {
            tx: 'Email',
            in: 'tg:label fs:Z fw:500 c:title'
          },
          Input: {
            phd: 'Enter email...',
            ":focus": {
              in: 'bdc:blue_0.5'
            },
            in: 'p:Z_A bg:gray3_0.3 bd:line_1px_solid bdr:Z c:title fs:Z2 ol:none typ:email'
          },
          in: 'ext:Flex fl:y g:Y'
        },
        StatusField: {
          Label: {
            tx: 'Status',
            in: 'tg:label fs:Z fw:500 c:title'
          },
          Select: {
            ch: [
              {
                tx: 'Active',
                in: 'tg:option val:active'
              },
              {
                tx: 'Pending',
                in: 'tg:option val:pending'
              },
              {
                tx: 'Inactive',
                in: 'tg:option val:inactive'
              }
            ],
            in: 'tg:select p:Z_A bg:gray3_0.3 bd:line_1px_solid bdr:Z c:title fs:Z2 ol:none cur:pointer'
          },
          in: 'ext:Flex fl:y g:Y'
        },
        NotesField: {
          Label: {
            tx: 'Notes',
            in: 'tg:label fs:Z fw:500 c:title'
          },
          Textarea: {
            phd: 'Add notes...',
            ":focus": {
              in: 'bdc:blue_0.5'
            },
            in: 'tg:textarea p:Z_A bg:gray3_0.3 bd:line_1px_solid bdr:Z c:title fs:Z2 ol:none mnh:C2 rsz:vertical'
          },
          in: 'ext:Flex fl:y g:Y'
        },
        in: 'ext:Flex fl:y p:A1 g:A'
      },
      ModalFooter: {
        CancelButton: {
          tx: 'Cancel',
          "@ck": (e, el, s) => s.root.update({ modalOpen: false }),
          in: 'ext:Button thm:transparent p:Y2_A fs:Z2 bdr:Z bd:line_1px_solid'
        },
        SaveButton: {
          tx: 'Save',
          "@ck": (e, el, s) => {
                      el.call('saveItem')
                      s.root.update({ modalOpen: false })
                    },
          in: 'ext:Button thm:primary p:Y2_A1 fs:Z2 fw:600 bdr:Z'
        },
        in: 'ext:Flex aln:center jc:flex-end g:Z p:A1 bdw:1px_0_0_0 bdst:solid bdc:line'
      },
      in: 'ext:Flex fl:y bg:gray2 bdr:A w:G2 mxw:90vw mxh:80vh ov:auto bd:line_1px_solid'
    },
    in: 'ext:Flex pos:fixed ist:0 bg:black_0.6 aln:center_center bdf:blur(4px)'
  },
  Footer: {
    "@mobile": {
      in: 'fxd:column g:Z ta:center'
    },
    Copyright: {
      tx: '© 2026 Dashboard Inc. All rights reserved.'
    },
    Links: {
      Link_privacy: {
        tx: 'Privacy Policy',
        hrf: '/privacy',
        ":hover": {
          in: 'c:title'
        },
        in: 'ext:Link c:caption'
      },
      Link_terms: {
        tx: 'Terms of Service',
        hrf: '/terms',
        ":hover": {
          in: 'c:title'
        },
        in: 'ext:Link c:caption'
      },
      Link_support: {
        tx: 'Support',
        hrf: '/support',
        ":hover": {
          in: 'c:title'
        },
        in: 'ext:Link c:caption'
      },
      in: 'ext:Flex g:A'
    },
    in: 'ext:Flex tg:footer aln:center_space-between p:A_A2 bdw:1px_0_0_0 bdst:solid bdc:line fs:Z c:caption'
  },
  in: 'ext:Flex fl:y w:100% mnh:100vh bg:gray1 c:title ff:primary pos:relative ov:hidden'
}
