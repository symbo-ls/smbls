// Shortened DashboardPage (shorten)
export const DashboardPage = {
  ext: 'Flex',
  fl: 'y',
  w: '100%',
  mnh: '100vh',
  bg: 'gray1',
  c: 'title',
  ff: 'primary',
  pos: 'relative',
  ov: 'hidden',
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
    bg: 'gray1',
    c: 'white'
  },
  "@light": {
    bg: 'white',
    c: 'gray1'
  },
  TopNav: {
    ext: 'Flex',
    tg: 'header',
    p: 'Z2 A2',
    bg: 'gray2',
    aln: 'center space-between',
    pos: 'sticky',
    tp: '0',
    zi: 100,
    bdw: '0 0 1px 0',
    bdst: 'solid',
    bdc: 'line',
    trn: 'background 0.2s ease',
    bxsh: 'black .10, 0px, 2px, 8px, 0px',
    "@mobile": {
      p: 'Y2 A'
    },
    "@tablet": {
      p: 'Z A1'
    },
    ":hover": {
      bg: 'gray2 1 +2'
    },
    LeftSection: {
      ext: 'Flex',
      aln: 'center',
      g: 'A',
      MenuButton: {
        ext: 'IconButton',
        ico: 'menu',
        thm: 'transparent',
        p: 'Y2',
        bdr: 'Z',
        cur: 'pointer',
        d: 'none',
        "@tablet": {
          d: 'flex'
        },
        "@ck": (e, el, s) => s.update({ sidebarOpen: !s.sidebarOpen })
      },
      Logo: {
        ext: 'Flex',
        aln: 'center',
        g: 'Y2',
        cur: 'pointer',
        Icon: {
          nm: 'logo',
          bsz: 'B1'
        },
        Title: {
          tg: 'strong',
          tx: 'Dashboard',
          fs: 'A1',
          fw: '700',
          ls: '-0.02em',
          "@mobile": {
            d: 'none'
          }
        }
      }
    },
    CenterSection: {
      ext: 'Flex',
      fx: '1',
      mxw: 'G',
      m: '- A2',
      "@mobile": {
        d: 'none'
      },
      SearchBar: {
        ext: 'Flex',
        w: '100%',
        bg: 'gray3 0.5',
        bdr: 'A',
        p: 'Y2 A',
        aln: 'center',
        g: 'Y2',
        trn: 'background 0.15s ease, border-color 0.15s ease',
        bd: 'gray3 1px solid',
        ":focus-within": {
          bg: 'gray3 0.8',
          bdc: 'blue 0.5'
        },
        Icon: {
          nm: 'search',
          bsz: 'A',
          c: 'caption',
          op: '0.6'
        },
        Input: {
          bg: 'transparent',
          bd: 'none',
          ol: 'none',
          c: 'title',
          fx: '1',
          fs: 'Z2',
          phd: 'Search anything...',
          "@ip": (e, el, s) => s.update({ searchQuery: e.target.value })
        },
        Shortcut: {
          ext: 'Text',
          tx: '⌘K',
          fs: 'Y2',
          p: 'X Y2',
          bg: 'gray3 0.3',
          bdr: 'Y',
          c: 'caption'
        }
      }
    },
    RightSection: {
      ext: 'Flex',
      aln: 'center',
      g: 'Z2',
      NotificationBell: {
        ext: 'IconButton',
        ico: 'bell',
        thm: 'transparent',
        pos: 'relative',
        p: 'Y2',
        bdr: 'Z',
        ":hover": {
          bg: 'gray3 0.5'
        },
        Badge: {
          ext: 'Text',
          tx: (el, s) => String(s.root.notifications?.length || 0),
          pos: 'absolute',
          tp: '-X',
          rgt: '-X',
          bg: 'red',
          c: 'white',
          fs: 'X',
          p: 'X Y',
          bdr: 'Z',
          mnw: 'Z',
          ta: 'center',
          hd: (el, s) => !s.root.notifications?.length
        }
      },
      ThemeToggle: {
        ext: 'IconButton',
        ico: (el, s) => (s.root.theme === 'dark' ? 'sun' : 'moon'),
        thm: 'transparent',
        p: 'Y2',
        bdr: 'Z',
        ":hover": {
          bg: 'gray3 0.5'
        },
        "@ck": (e, el, s) => {
                  s.root.update({ theme: s.root.theme === 'dark' ? 'light' : 'dark' })
                }
      },
      UserMenu: {
        ext: 'Flex',
        aln: 'center',
        g: 'Y2',
        cur: 'pointer',
        p: 'X Y2',
        bdr: 'Z',
        ":hover": {
          bg: 'gray3 0.3'
        },
        Avatar: {
          src: 'user-avatar.png',
          bsz: 'B',
          bdr: 'Z',
          obf: 'cover'
        },
        Name: {
          ext: 'Text',
          tx: 'John Doe',
          fs: 'Z2',
          fw: '500',
          "@mobile": {
            d: 'none'
          }
        },
        Icon: {
          nm: 'chevronDown',
          bsz: 'Y2',
          c: 'caption'
        }
      }
    }
  },
  MainLayout: {
    ext: 'Flex',
    fx: '1',
    ov: 'hidden',
    Sidebar: {
      ext: 'Flex',
      tg: 'aside',
      fl: 'y',
      w: 'F1',
      mnw: 'F1',
      bg: 'gray2',
      bdw: '0 1px 0 0',
      bdst: 'solid',
      bdc: 'line',
      p: 'A 0',
      ov: 'auto',
      trn: 'transform 0.25s ease, width 0.25s ease',
      zi: 50,
      "@tablet": {
        pos: 'absolute',
        tp: '0',
        lft: '0',
        h: '100%',
        bxsh: 'black .20, 4px, 0, 16px, 0'
      },
      hd: (el, s) => {
              if (typeof window !== 'undefined' && window.innerWidth < 768) {
                return !s.sidebarOpen
              }
              return false
            },
      NavSection: {
        ext: 'Flex',
        fl: 'y',
        p: '0 Z2',
        g: 'X',
        SectionLabel: {
          ext: 'Text',
          tx: 'MAIN',
          fs: 'X',
          fw: '700',
          ls: '0.08em',
          c: 'caption',
          p: 'Y2 A',
          tt: 'uppercase'
        },
        cex: 'Flex',
        cp: {
          aln: 'center',
          g: 'Z',
          p: 'Z A',
          bdr: 'Z',
          cur: 'pointer',
          c: 'caption',
          fs: 'Z2',
          fw: '500',
          trn: 'background 0.15s ease, color 0.15s ease',
          ":hover": {
            bg: 'gray3 0.3',
            c: 'title'
          }
        },
        OverviewLink: {
          Icon: {
            nm: 'dashboard',
            bsz: 'A'
          },
          Label: {
            tx: 'Overview'
          },
          isActive: (el, s) => s.activeTab === 'overview',
          ".isActive": {
            bg: 'blue 0.15',
            c: 'blue'
          },
          "@ck": (e, el, s) => s.update({ activeTab: 'overview' })
        },
        AnalyticsLink: {
          Icon: {
            nm: 'chart',
            bsz: 'A'
          },
          Label: {
            tx: 'Analytics'
          },
          isActive: (el, s) => s.activeTab === 'analytics',
          ".isActive": {
            bg: 'blue 0.15',
            c: 'blue'
          },
          "@ck": (e, el, s) => s.update({ activeTab: 'analytics' })
        },
        ProjectsLink: {
          Icon: {
            nm: 'folder',
            bsz: 'A'
          },
          Label: {
            tx: 'Projects'
          },
          isActive: (el, s) => s.activeTab === 'projects',
          ".isActive": {
            bg: 'blue 0.15',
            c: 'blue'
          },
          "@ck": (e, el, s) => s.update({ activeTab: 'projects' })
        },
        TeamLink: {
          Icon: {
            nm: 'users',
            bsz: 'A'
          },
          Label: {
            tx: 'Team'
          },
          isActive: (el, s) => s.activeTab === 'team',
          ".isActive": {
            bg: 'blue 0.15',
            c: 'blue'
          },
          "@ck": (e, el, s) => s.update({ activeTab: 'team' })
        },
        MessagesLink: {
          Icon: {
            nm: 'message',
            bsz: 'A'
          },
          Label: {
            tx: 'Messages'
          },
          isActive: (el, s) => s.activeTab === 'messages',
          ".isActive": {
            bg: 'blue 0.15',
            c: 'blue'
          },
          "@ck": (e, el, s) => s.update({ activeTab: 'messages' })
        }
      },
      NavSection_settings: {
        ext: 'Flex',
        fl: 'y',
        p: '0 Z2',
        g: 'X',
        mt: 'B',
        SectionLabel: {
          ext: 'Text',
          tx: 'SETTINGS',
          fs: 'X',
          fw: '700',
          ls: '0.08em',
          c: 'caption',
          p: 'Y2 A',
          tt: 'uppercase'
        },
        ProfileLink: {
          ext: 'Flex',
          aln: 'center',
          g: 'Z',
          p: 'Z A',
          bdr: 'Z',
          cur: 'pointer',
          c: 'caption',
          fs: 'Z2',
          fw: '500',
          trn: 'background 0.15s ease',
          ":hover": {
            bg: 'gray3 0.3',
            c: 'title'
          },
          Icon: {
            nm: 'user',
            bsz: 'A'
          },
          Label: {
            tx: 'Profile'
          }
        },
        BillingLink: {
          ext: 'Flex',
          aln: 'center',
          g: 'Z',
          p: 'Z A',
          bdr: 'Z',
          cur: 'pointer',
          c: 'caption',
          fs: 'Z2',
          fw: '500',
          trn: 'background 0.15s ease',
          ":hover": {
            bg: 'gray3 0.3',
            c: 'title'
          },
          Icon: {
            nm: 'creditCard',
            bsz: 'A'
          },
          Label: {
            tx: 'Billing'
          }
        },
        SecurityLink: {
          ext: 'Flex',
          aln: 'center',
          g: 'Z',
          p: 'Z A',
          bdr: 'Z',
          cur: 'pointer',
          c: 'caption',
          fs: 'Z2',
          fw: '500',
          trn: 'background 0.15s ease',
          ":hover": {
            bg: 'gray3 0.3',
            c: 'title'
          },
          Icon: {
            nm: 'shield',
            bsz: 'A'
          },
          Label: {
            tx: 'Security'
          }
        }
      }
    },
    Content: {
      ext: 'Flex',
      fl: 'y',
      fx: '1',
      ov: 'auto',
      p: 'A2',
      g: 'A2',
      "@mobile": {
        p: 'A'
      },
      "@tablet": {
        p: 'A1'
      },
      PageHeader: {
        ext: 'Flex',
        aln: 'center space-between',
        fxw: 'wrap',
        g: 'A',
        Left: {
          ext: 'Flex',
          fl: 'y',
          g: 'Y',
          H1: {
            tx: 'Overview',
            fs: 'C',
            fw: '700',
            ls: '-0.03em',
            c: 'title',
            "@mobile": {
              fs: 'B'
            }
          },
          Breadcrumb: {
            ext: 'Flex',
            aln: 'center',
            g: 'Y',
            c: 'caption',
            fs: 'Z',
            Link_home: {
              tx: 'Home',
              hrf: '/',
              c: 'blue',
              ":hover": {
                td: 'underline'
              }
            },
            Separator: {
              tx: '/'
            },
            Current: {
              tx: 'Overview',
              fw: '500'
            }
          }
        },
        Right: {
          ext: 'Flex',
          aln: 'center',
          g: 'Z2',
          "@mobile": {
            w: '100%',
            jc: 'space-between'
          },
          DateRangeButton: {
            ext: 'Button',
            ico: 'calendar',
            tx: 'Last 7 days',
            thm: 'field',
            p: 'Y2 A',
            fs: 'Z2',
            bdr: 'Z',
            g: 'Y2'
          },
          ExportButton: {
            ext: 'Button',
            ico: 'download',
            tx: 'Export',
            thm: 'transparent',
            p: 'Y2 A',
            fs: 'Z2',
            bdr: 'Z',
            g: 'Y2',
            ":hover": {
              bg: 'gray3 0.3'
            }
          },
          CreateButton: {
            ext: 'Button',
            ico: 'plus',
            tx: 'Create New',
            thm: 'primary',
            p: 'Y2 A1',
            fs: 'Z2',
            fw: '600',
            bdr: 'Z',
            g: 'Y2',
            "@ck": (e, el, s) =>
                          s.root.update({ modalOpen: true, modalType: 'create' })
          }
        }
      },
      StatsGrid: {
        ext: 'Grid',
        col: 'repeat(4, 1fr)',
        g: 'A',
        "@tablet": {
          col: 'repeat(2, 1fr)'
        },
        "@mobile": {
          col: '1fr'
        },
        cex: 'Flex',
        cp: {
          fl: 'y',
          p: 'A1',
          bg: 'gray2',
          bdr: 'A',
          g: 'Z',
          bd: 'line 1px solid',
          trn: 'border-color 0.15s ease, box-shadow 0.15s ease',
          ":hover": {
            bdc: 'blue 0.3',
            bxsh: 'blue .05, 0px, 0px, 0px, 4px'
          }
        },
        RevenueCard: {
          Header: {
            ext: 'Flex',
            aln: 'center space-between',
            Label: {
              tx: 'Total Revenue',
              fs: 'Z',
              c: 'caption',
              fw: '500'
            },
            Icon: {
              nm: 'dollarSign',
              bsz: 'A',
              c: 'green'
            }
          },
          Value: {
            tx: '$45,231.89',
            fs: 'B1',
            fw: '700',
            c: 'title'
          },
          Change: {
            ext: 'Flex',
            aln: 'center',
            g: 'X',
            Icon: {
              nm: 'arrowUp',
              bsz: 'Y2',
              c: 'green'
            },
            Text: {
              tx: '+20.1% from last month',
              fs: 'Y2',
              c: 'green'
            }
          }
        },
        SubscriptionsCard: {
          Header: {
            ext: 'Flex',
            aln: 'center space-between',
            Label: {
              tx: 'Subscriptions',
              fs: 'Z',
              c: 'caption',
              fw: '500'
            },
            Icon: {
              nm: 'users',
              bsz: 'A',
              c: 'blue'
            }
          },
          Value: {
            tx: '+2,350',
            fs: 'B1',
            fw: '700',
            c: 'title'
          },
          Change: {
            ext: 'Flex',
            aln: 'center',
            g: 'X',
            Icon: {
              nm: 'arrowUp',
              bsz: 'Y2',
              c: 'green'
            },
            Text: {
              tx: '+180.1% from last month',
              fs: 'Y2',
              c: 'green'
            }
          }
        },
        SalesCard: {
          Header: {
            ext: 'Flex',
            aln: 'center space-between',
            Label: {
              tx: 'Sales',
              fs: 'Z',
              c: 'caption',
              fw: '500'
            },
            Icon: {
              nm: 'creditCard',
              bsz: 'A',
              c: 'purple'
            }
          },
          Value: {
            tx: '+12,234',
            fs: 'B1',
            fw: '700',
            c: 'title'
          },
          Change: {
            ext: 'Flex',
            aln: 'center',
            g: 'X',
            Icon: {
              nm: 'arrowUp',
              bsz: 'Y2',
              c: 'green'
            },
            Text: {
              tx: '+19% from last month',
              fs: 'Y2',
              c: 'green'
            }
          }
        },
        ActiveUsersCard: {
          Header: {
            ext: 'Flex',
            aln: 'center space-between',
            Label: {
              tx: 'Active Now',
              fs: 'Z',
              c: 'caption',
              fw: '500'
            },
            Icon: {
              nm: 'activity',
              bsz: 'A',
              c: 'orange'
            }
          },
          Value: {
            tx: '573',
            fs: 'B1',
            fw: '700',
            c: 'title'
          },
          Change: {
            ext: 'Flex',
            aln: 'center',
            g: 'X',
            Icon: {
              nm: 'arrowDown',
              bsz: 'Y2',
              c: 'red'
            },
            Text: {
              tx: '-3.2% from last hour',
              fs: 'Y2',
              c: 'red'
            }
          }
        }
      },
      ChartsRow: {
        ext: 'Grid',
        col: '2fr 1fr',
        g: 'A',
        "@tablet": {
          col: '1fr'
        },
        MainChart: {
          ext: 'Flex',
          fl: 'y',
          bg: 'gray2',
          bdr: 'A',
          bd: 'line 1px solid',
          ov: 'hidden',
          ChartHeader: {
            ext: 'Flex',
            aln: 'center space-between',
            p: 'A1',
            bdw: '0 0 1px 0',
            bdst: 'solid',
            bdc: 'line',
            Left: {
              ext: 'Flex',
              fl: 'y',
              g: 'X',
              Title: {
                tx: 'Revenue Analytics',
                fs: 'A',
                fw: '600',
                c: 'title'
              },
              Subtitle: {
                tx: 'Monthly revenue breakdown',
                fs: 'Z',
                c: 'caption'
              }
            },
            PeriodTabs: {
              ext: 'Flex',
              g: 'X',
              bg: 'gray3 0.3',
              p: 'X',
              bdr: 'Y2',
              cex: 'Button',
              cp: {
                thm: 'transparent',
                p: 'Y Y2',
                fs: 'Y2',
                bdr: 'Y',
                fw: '500',
                cur: 'pointer'
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
              }
            }
          },
          ChartCanvas: {
            tg: 'canvas',
            mnh: 'E',
            p: 'A1',
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
                        }
          }
        },
        SideChart: {
          ext: 'Flex',
          fl: 'y',
          bg: 'gray2',
          bdr: 'A',
          bd: 'line 1px solid',
          ov: 'hidden',
          ChartHeader: {
            ext: 'Flex',
            fl: 'y',
            g: 'X',
            p: 'A1',
            bdw: '0 0 1px 0',
            bdst: 'solid',
            bdc: 'line',
            Title: {
              tx: 'Traffic Sources',
              fs: 'A',
              fw: '600',
              c: 'title'
            },
            Subtitle: {
              tx: 'Top channels this month',
              fs: 'Z',
              c: 'caption'
            }
          },
          Items: {
            ext: 'Flex',
            fl: 'y',
            p: 'A1',
            g: 'Z2',
            cex: 'Flex',
            cp: {
              aln: 'center space-between',
              p: 'Z',
              bdr: 'Y2',
              ":hover": {
                bg: 'gray3 0.2'
              }
            },
            DirectItem: {
              Label: {
                ext: 'Flex',
                aln: 'center',
                g: 'Z',
                Dot: {
                  bsz: 'Y',
                  bdr: 'Y',
                  bg: 'blue'
                },
                Text: {
                  tx: 'Direct',
                  fs: 'Z2',
                  c: 'title'
                }
              },
              Value: {
                tx: '42%',
                fs: 'Z2',
                fw: '600',
                c: 'title'
              }
            },
            OrganicItem: {
              Label: {
                ext: 'Flex',
                aln: 'center',
                g: 'Z',
                Dot: {
                  bsz: 'Y',
                  bdr: 'Y',
                  bg: 'green'
                },
                Text: {
                  tx: 'Organic',
                  fs: 'Z2',
                  c: 'title'
                }
              },
              Value: {
                tx: '28%',
                fs: 'Z2',
                fw: '600',
                c: 'title'
              }
            },
            ReferralItem: {
              Label: {
                ext: 'Flex',
                aln: 'center',
                g: 'Z',
                Dot: {
                  bsz: 'Y',
                  bdr: 'Y',
                  bg: 'purple'
                },
                Text: {
                  tx: 'Referral',
                  fs: 'Z2',
                  c: 'title'
                }
              },
              Value: {
                tx: '18%',
                fs: 'Z2',
                fw: '600',
                c: 'title'
              }
            },
            SocialItem: {
              Label: {
                ext: 'Flex',
                aln: 'center',
                g: 'Z',
                Dot: {
                  bsz: 'Y',
                  bdr: 'Y',
                  bg: 'orange'
                },
                Text: {
                  tx: 'Social',
                  fs: 'Z2',
                  c: 'title'
                }
              },
              Value: {
                tx: '12%',
                fs: 'Z2',
                fw: '600',
                c: 'title'
              }
            }
          }
        }
      },
      TableSection: {
        ext: 'Flex',
        fl: 'y',
        bg: 'gray2',
        bdr: 'A',
        bd: 'line 1px solid',
        ov: 'hidden',
        TableHeader: {
          ext: 'Flex',
          aln: 'center space-between',
          p: 'A1',
          bdw: '0 0 1px 0',
          bdst: 'solid',
          bdc: 'line',
          fxw: 'wrap',
          g: 'Z2',
          Left: {
            ext: 'Flex',
            fl: 'y',
            g: 'X',
            Title: {
              tx: 'Recent Transactions',
              fs: 'A',
              fw: '600',
              c: 'title'
            },
            Subtitle: {
              tx: 'Showing latest 25 transactions',
              fs: 'Z',
              c: 'caption'
            }
          },
          Controls: {
            ext: 'Flex',
            aln: 'center',
            g: 'Z',
            FilterButton: {
              ext: 'Button',
              ico: 'filter',
              tx: 'Filter',
              thm: 'transparent',
              p: 'Y2 Z2',
              fs: 'Z',
              bdr: 'Z',
              bd: 'line 1px solid',
              g: 'Y'
            },
            SearchInput: {
              ext: 'Flex',
              bg: 'gray3 0.3',
              bdr: 'Z',
              p: 'Y2 Z2',
              aln: 'center',
              g: 'Y',
              bd: 'line 1px solid',
              ":focus-within": {
                bdc: 'blue 0.5'
              },
              Icon: {
                nm: 'search',
                bsz: 'Z2',
                c: 'caption'
              },
              Input: {
                bg: 'transparent',
                bd: 'none',
                ol: 'none',
                c: 'title',
                fs: 'Z',
                phd: 'Search transactions...',
                w: 'D'
              }
            }
          }
        },
        Table: {
          tg: 'table',
          w: '100%',
          bdcl: 'collapse',
          fs: 'Z',
          sy: {
            minWidth: '600px',
            tableLayout: 'fixed'
          },
          Thead: {
            tg: 'thead',
            Row: {
              tg: 'tr',
              bg: 'gray3 0.15',
              cex: 'Text',
              cp: {
                tg: 'th',
                p: 'Z A1',
                ta: 'left',
                fw: '600',
                fs: 'Y2',
                c: 'caption',
                tt: 'uppercase',
                ls: '0.05em',
                cur: 'pointer',
                us: 'none',
                ":hover": {
                  c: 'title'
                }
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
                ta: 'right'
              }
            }
          },
          Tbody: {
            tg: 'tbody',
            ch: (el, s) => s.root.transactions || [],
            cha: 'state',
            cex: {
              tg: 'tr',
              trn: 'background 0.1s ease',
              ":hover": {
                bg: 'gray3 0.15'
              },
              cp: {
                tg: 'td',
                p: 'Z A1',
                bdw: '1px 0 0 0',
                bdst: 'solid',
                bdc: 'line',
                va: 'middle'
              },
              NameCell: {
                ext: 'Flex',
                tg: 'td',
                aln: 'center',
                g: 'Z',
                p: 'Z A1',
                bdw: '1px 0 0 0',
                bdst: 'solid',
                bdc: 'line',
                Avatar: {
                  bsz: 'B',
                  bdr: 'Z',
                  bg: 'blue 0.15',
                  c: 'blue',
                  ext: 'Flex',
                  aln: 'center center',
                  fs: 'Z',
                  fw: '600',
                  tx: (el, s) => s.name?.charAt(0) || '?'
                },
                Text: {
                  tx: (el, s) => s.name,
                  fw: '500',
                  c: 'title'
                }
              },
              EmailCell: {
                tx: (el, s) => s.email,
                c: 'caption'
              },
              AmountCell: {
                tx: (el, s) => s.amount,
                fw: '600',
                c: 'title'
              },
              StatusCell: {
                tg: 'td',
                p: 'Z A1',
                bdw: '1px 0 0 0',
                bdst: 'solid',
                bdc: 'line',
                Badge: {
                  ext: 'Text',
                  tx: (el, s) => s.status,
                  p: 'X Y2',
                  bdr: 'Y',
                  fs: 'Y2',
                  fw: '500',
                  isCompleted: (el, s) => s.status === 'Completed',
                  isPending: (el, s) => s.status === 'Pending',
                  isFailed: (el, s) => s.status === 'Failed',
                  ".isCompleted": {
                    bg: 'green 0.15',
                    c: 'green'
                  },
                  ".isPending": {
                    bg: 'orange 0.15',
                    c: 'orange'
                  },
                  ".isFailed": {
                    bg: 'red 0.15',
                    c: 'red'
                  }
                }
              },
              DateCell: {
                tx: (el, s) => s.date,
                c: 'caption'
              },
              ActionsCell: {
                tg: 'td',
                ta: 'right',
                p: 'Z A1',
                bdw: '1px 0 0 0',
                bdst: 'solid',
                bdc: 'line',
                ext: 'Flex',
                aln: 'center',
                jc: 'flex-end',
                g: 'Y',
                ViewButton: {
                  ext: 'IconButton',
                  ico: 'eye',
                  thm: 'transparent',
                  p: 'X',
                  bdr: 'Y',
                  ":hover": {
                    bg: 'blue 0.1'
                  }
                },
                EditButton: {
                  ext: 'IconButton',
                  ico: 'edit',
                  thm: 'transparent',
                  p: 'X',
                  bdr: 'Y',
                  ":hover": {
                    bg: 'green 0.1'
                  }
                },
                DeleteButton: {
                  ext: 'IconButton',
                  ico: 'trash',
                  thm: 'transparent',
                  p: 'X',
                  bdr: 'Y',
                  ":hover": {
                    bg: 'red 0.1'
                  },
                  "@ck": (e, el, s) => {
                                      el.call('deleteTransaction', s.id)
                                    }
                }
              }
            }
          }
        },
        TableFooter: {
          ext: 'Flex',
          aln: 'center space-between',
          p: 'Z2 A1',
          bdw: '1px 0 0 0',
          bdst: 'solid',
          bdc: 'line',
          "@mobile": {
            fxd: 'column',
            g: 'Z'
          },
          Info: {
            ext: 'Text',
            tx: (el, s) =>
                          `Showing ${(s.currentPage - 1) * s.pageSize + 1} to ${Math.min(s.currentPage * s.pageSize, 100)} of 100 entries`,
            fs: 'Z',
            c: 'caption'
          },
          PaginationControls: {
            ext: 'Flex',
            aln: 'center',
            g: 'Y',
            PrevButton: {
              ext: 'Button',
              tx: 'Previous',
              thm: 'transparent',
              p: 'Y Y2',
              fs: 'Z',
              bdr: 'Y2',
              bd: 'line 1px solid',
              dis: (el, s) => s.currentPage <= 1,
              "@ck": (e, el, s) =>
                              s.update({ currentPage: s.currentPage - 1 })
            },
            PageNumbers: {
              ext: 'Flex',
              g: 'X',
              ch: (el, s) => {
                              const pages = []
                              for (let i = 1; i <= 4; i++) pages.push({ page: i })
                              return pages
                            },
              cha: 'state',
              cex: 'Button',
              cp: {
                thm: 'transparent',
                p: 'Y Y2',
                fs: 'Z',
                bdr: 'Y2',
                mnw: 'B',
                ta: 'center',
                tx: (el, s) => String(s.page),
                isActive: (el, s) => s.page === s.root.currentPage,
                ".isActive": {
                  bg: 'blue',
                  c: 'white'
                },
                "@ck": (e, el, s) => s.root.update({ currentPage: s.page })
              }
            },
            NextButton: {
              ext: 'Button',
              tx: 'Next',
              thm: 'transparent',
              p: 'Y Y2',
              fs: 'Z',
              bdr: 'Y2',
              bd: 'line 1px solid',
              dis: (el, s) => s.currentPage >= 4,
              "@ck": (e, el, s) =>
                              s.update({ currentPage: s.currentPage + 1 })
            }
          }
        }
      },
      ActivitySection: {
        ext: 'Flex',
        fl: 'y',
        bg: 'gray2',
        bdr: 'A',
        bd: 'line 1px solid',
        p: 'A1',
        g: 'A',
        Header: {
          ext: 'Flex',
          aln: 'center space-between',
          Title: {
            tx: 'Recent Activity',
            fs: 'A',
            fw: '600',
            c: 'title'
          },
          ViewAll: {
            ext: 'Link',
            tx: 'View all',
            hrf: '/activity',
            c: 'blue',
            fs: 'Z',
            ":hover": {
              td: 'underline'
            }
          }
        },
        Feed: {
          ext: 'Flex',
          fl: 'y',
          g: 'Z2',
          cex: 'Flex',
          cp: {
            g: 'Z',
            p: 'Z',
            bdr: 'Z',
            ":hover": {
              bg: 'gray3 0.15'
            }
          },
          Activity_1: {
            Indicator: {
              bsz: 'B',
              bdr: 'Z',
              bg: 'green 0.15',
              ext: 'Flex',
              aln: 'center center',
              fxs: '0',
              Icon: {
                nm: 'check',
                bsz: 'Z2',
                c: 'green'
              }
            },
            Details: {
              ext: 'Flex',
              fl: 'y',
              g: 'X',
              Title: {
                tx: 'Payment received from Acme Corp',
                fs: 'Z2',
                fw: '500',
                c: 'title'
              },
              Time: {
                tx: '2 minutes ago',
                fs: 'Y2',
                c: 'caption'
              }
            },
            Amount: {
              tx: '+$1,200.00',
              fs: 'Z2',
              fw: '600',
              c: 'green',
              ml: 'auto'
            }
          },
          Activity_2: {
            Indicator: {
              bsz: 'B',
              bdr: 'Z',
              bg: 'blue 0.15',
              ext: 'Flex',
              aln: 'center center',
              fxs: '0',
              Icon: {
                nm: 'userPlus',
                bsz: 'Z2',
                c: 'blue'
              }
            },
            Details: {
              ext: 'Flex',
              fl: 'y',
              g: 'X',
              Title: {
                tx: 'New team member added: Sarah Wilson',
                fs: 'Z2',
                fw: '500',
                c: 'title'
              },
              Time: {
                tx: '15 minutes ago',
                fs: 'Y2',
                c: 'caption'
              }
            }
          },
          Activity_3: {
            Indicator: {
              bsz: 'B',
              bdr: 'Z',
              bg: 'orange 0.15',
              ext: 'Flex',
              aln: 'center center',
              fxs: '0',
              Icon: {
                nm: 'alertTriangle',
                bsz: 'Z2',
                c: 'orange'
              }
            },
            Details: {
              ext: 'Flex',
              fl: 'y',
              g: 'X',
              Title: {
                tx: 'Server CPU usage reached 85%',
                fs: 'Z2',
                fw: '500',
                c: 'title'
              },
              Time: {
                tx: '1 hour ago',
                fs: 'Y2',
                c: 'caption'
              }
            }
          },
          Activity_4: {
            Indicator: {
              bsz: 'B',
              bdr: 'Z',
              bg: 'purple 0.15',
              ext: 'Flex',
              aln: 'center center',
              fxs: '0',
              Icon: {
                nm: 'gitBranch',
                bsz: 'Z2',
                c: 'purple'
              }
            },
            Details: {
              ext: 'Flex',
              fl: 'y',
              g: 'X',
              Title: {
                tx: 'Deployment v2.4.1 completed successfully',
                fs: 'Z2',
                fw: '500',
                c: 'title'
              },
              Time: {
                tx: '3 hours ago',
                fs: 'Y2',
                c: 'caption'
              }
            }
          },
          Activity_5: {
            Indicator: {
              bsz: 'B',
              bdr: 'Z',
              bg: 'red 0.15',
              ext: 'Flex',
              aln: 'center center',
              fxs: '0',
              Icon: {
                nm: 'xCircle',
                bsz: 'Z2',
                c: 'red'
              }
            },
            Details: {
              ext: 'Flex',
              fl: 'y',
              g: 'X',
              Title: {
                tx: 'Failed payment attempt - Invoice #1234',
                fs: 'Z2',
                fw: '500',
                c: 'title'
              },
              Time: {
                tx: '5 hours ago',
                fs: 'Y2',
                c: 'caption'
              }
            },
            Amount: {
              tx: '-$450.00',
              fs: 'Z2',
              fw: '600',
              c: 'red',
              ml: 'auto'
            }
          }
        }
      }
    }
  },
  ModalOverlay: {
    ext: 'Flex',
    pos: 'fixed',
    ist: '0',
    bg: 'black 0.6',
    zi: 200,
    aln: 'center center',
    op: (el, s) => (s.root.modalOpen ? '1' : '0'),
    vis: (el, s) => (s.root.modalOpen ? 'visible' : 'hidden'),
    trn: 'opacity 0.2s ease, visibility 0.2s ease',
    bdf: 'blur(4px)',
    "@ck": (e, el, s) => s.root.update({ modalOpen: false }),
    ModalContent: {
      ext: 'Flex',
      fl: 'y',
      bg: 'gray2',
      bdr: 'A',
      w: 'G2',
      mxw: '90vw',
      mxh: '80vh',
      ov: 'auto',
      bd: 'line 1px solid',
      bxsh: 'black .30, 0px, 16px, 48px, 0px',
      "@ck": (e) => e.stopPropagation(),
      ModalHeader: {
        ext: 'Flex',
        aln: 'center space-between',
        p: 'A1',
        bdw: '0 0 1px 0',
        bdst: 'solid',
        bdc: 'line',
        Title: {
          tx: 'Create New Item',
          fs: 'A1',
          fw: '600',
          c: 'title'
        },
        CloseButton: {
          ext: 'IconButton',
          ico: 'x',
          thm: 'transparent',
          p: 'Y',
          bdr: 'Y2',
          ":hover": {
            bg: 'gray3 0.5'
          },
          "@ck": (e, el, s) => s.root.update({ modalOpen: false })
        }
      },
      ModalBody: {
        ext: 'Flex',
        fl: 'y',
        p: 'A1',
        g: 'A',
        NameField: {
          ext: 'Flex',
          fl: 'y',
          g: 'Y',
          Label: {
            tg: 'label',
            tx: 'Name',
            fs: 'Z',
            fw: '500',
            c: 'title'
          },
          Input: {
            p: 'Z A',
            bg: 'gray3 0.3',
            bd: 'line 1px solid',
            bdr: 'Z',
            c: 'title',
            fs: 'Z2',
            ol: 'none',
            phd: 'Enter name...',
            ":focus": {
              bdc: 'blue 0.5'
            }
          }
        },
        EmailField: {
          ext: 'Flex',
          fl: 'y',
          g: 'Y',
          Label: {
            tg: 'label',
            tx: 'Email',
            fs: 'Z',
            fw: '500',
            c: 'title'
          },
          Input: {
            p: 'Z A',
            bg: 'gray3 0.3',
            bd: 'line 1px solid',
            bdr: 'Z',
            c: 'title',
            fs: 'Z2',
            ol: 'none',
            typ: 'email',
            phd: 'Enter email...',
            ":focus": {
              bdc: 'blue 0.5'
            }
          }
        },
        StatusField: {
          ext: 'Flex',
          fl: 'y',
          g: 'Y',
          Label: {
            tg: 'label',
            tx: 'Status',
            fs: 'Z',
            fw: '500',
            c: 'title'
          },
          Select: {
            tg: 'select',
            p: 'Z A',
            bg: 'gray3 0.3',
            bd: 'line 1px solid',
            bdr: 'Z',
            c: 'title',
            fs: 'Z2',
            ol: 'none',
            cur: 'pointer',
            ch: [
              {
                tg: 'option',
                tx: 'Active',
                val: 'active'
              },
              {
                tg: 'option',
                tx: 'Pending',
                val: 'pending'
              },
              {
                tg: 'option',
                tx: 'Inactive',
                val: 'inactive'
              }
            ]
          }
        },
        NotesField: {
          ext: 'Flex',
          fl: 'y',
          g: 'Y',
          Label: {
            tg: 'label',
            tx: 'Notes',
            fs: 'Z',
            fw: '500',
            c: 'title'
          },
          Textarea: {
            tg: 'textarea',
            p: 'Z A',
            bg: 'gray3 0.3',
            bd: 'line 1px solid',
            bdr: 'Z',
            c: 'title',
            fs: 'Z2',
            ol: 'none',
            mnh: 'C2',
            rsz: 'vertical',
            phd: 'Add notes...',
            ":focus": {
              bdc: 'blue 0.5'
            }
          }
        }
      },
      ModalFooter: {
        ext: 'Flex',
        aln: 'center',
        jc: 'flex-end',
        g: 'Z',
        p: 'A1',
        bdw: '1px 0 0 0',
        bdst: 'solid',
        bdc: 'line',
        CancelButton: {
          ext: 'Button',
          tx: 'Cancel',
          thm: 'transparent',
          p: 'Y2 A',
          fs: 'Z2',
          bdr: 'Z',
          bd: 'line 1px solid',
          "@ck": (e, el, s) => s.root.update({ modalOpen: false })
        },
        SaveButton: {
          ext: 'Button',
          tx: 'Save',
          thm: 'primary',
          p: 'Y2 A1',
          fs: 'Z2',
          fw: '600',
          bdr: 'Z',
          "@ck": (e, el, s) => {
                      el.call('saveItem')
                      s.root.update({ modalOpen: false })
                    }
        }
      }
    }
  },
  Footer: {
    ext: 'Flex',
    tg: 'footer',
    aln: 'center space-between',
    p: 'A A2',
    bdw: '1px 0 0 0',
    bdst: 'solid',
    bdc: 'line',
    fs: 'Z',
    c: 'caption',
    "@mobile": {
      fxd: 'column',
      g: 'Z',
      ta: 'center'
    },
    Copyright: {
      tx: '© 2026 Dashboard Inc. All rights reserved.'
    },
    Links: {
      ext: 'Flex',
      g: 'A',
      Link_privacy: {
        ext: 'Link',
        tx: 'Privacy Policy',
        hrf: '/privacy',
        c: 'caption',
        ":hover": {
          c: 'title'
        }
      },
      Link_terms: {
        ext: 'Link',
        tx: 'Terms of Service',
        hrf: '/terms',
        c: 'caption',
        ":hover": {
          c: 'title'
        }
      },
      Link_support: {
        ext: 'Link',
        tx: 'Support',
        hrf: '/support',
        c: 'caption',
        ":hover": {
          c: 'title'
        }
      }
    }
  }
}
