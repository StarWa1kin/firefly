type IQuickWinsInvestigateGraphItem = {
  machine_name: string;
  data_point: Array<{
    time: string;
    value: string;
  }>;
};

type IQuickWinsDashBreakdownItem = {};

declare namespace API {
  interface IAlert {
    verdict_id: string;
    priority: number;
    what: string | null;
    date: string;
    ringfence: string | null;
    backtrace: string | null;
  }

  interface IAlertCount {
    priorty: number;
    count: number;
  }

  interface IDevices {
    mac: string;
    ip: string;
    tag: string;
    group: string;
    ff_id: string;
  }

  type IExist = boolean;

  interface ITopTalker extends IDevices {
    date: string;
    bytes: number;
    ports: Object<any> | null;
  }

  interface IFireflys {
    property1: string;
    property2: string;
  }

  interface IFireflysExists {
    property1: boolean;
    property2: boolean;
  }

  interface IGroup {
    [key: string]: Array<IDevices>;
  }

  interface IFireBug {
    modules: {
      wrm: any;
      wrdp: any;
      ssh: any;
      inf: any;
      psc: any;
      smb: any;
      dns: any;
    };
    ringfences: {
      ringfences: {
        name: string;
        cidrs: string;
      };
    };
    ssh_whitelist: Array<string>;
    wrm_whitelist: Array<string>;
    wrdp_whitelist: Array<string>;
    ssh_blacklist: Array<string>;
    wrm_blacklist: Array<string>;
    wrdp_blacklist: Array<string>;
    dns_types: Array<string>;
    suspicious_countries: Array<string>;
  }

  interface IFrireflyDetail {
    status: string;
    tag: string;
    firefly_id: string;
    config: {
      firebug_addr: string;
      firebug_port: number;
      netflow_port: number;
      ringfences: Array<{
        name: string;
        cidrs: string;
      }>;
    };
  }

  interface IQuickWinsInvestigateGraph {
    ff_id: string;
    graphs: [
      {
        machine_name: string;
        data_point: Array<IQuickWinsInvestigateGraphItem>;
      },
    ];
  }

  interface IQuickWinsInvestigateLog {
    ff_id: string;
    logs: Array<{
      date: string;
      type: string;
      priority: number;
      message: string;
      who: Array<{
        ip: string;
        fqdns: any[];
      }>;
    }>;
    pagination: {
      next_page: number;
      total_record: number;
      current_page: number;
      prev_page: number;
      total_pages: number;
    };
  }

  interface IQuickWinsDashHistory {
    ff_id: string;
    start_date: string;
    data_array: any[];
  }

  interface IQuickWinsDashBreakdown {
    ff_id: string;
    event_dict: {
      [key: string]: string;
    };
    event_breakdown: {
      [key: string]: number;
    };
  }

  interface ISearchProtocol {
    name: string;
    ip: string;
    mac: string;
    firefly_id: string;
    throughput: number;
  }

  interface ISearchAlert {
    priority: number;
    what: string;
    when: string;
    where: string;
    backtrace: string;
  }
  interface ISearchDevice {
    name: string;
    ip: string;
    mac: string;
    firefly_id: string;
    throughput: number[];
  }
}
