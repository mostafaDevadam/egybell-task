import { Component, inject, OnInit, signal } from '@angular/core';
import { LogsService } from '../../services/logs';
import { ITabelField, Table } from '../../components/data-tables/table/table';
import { LOG_TYPE } from '../../shared/types';

@Component({
  selector: 'app-activity-logs',
  imports: [Table],
  templateUrl: './activity-logs.html',
  styleUrl: './activity-logs.css',
})
export class ActivityLogs implements OnInit{
  service = inject(LogsService)
  logs = signal<LOG_TYPE[]>([])

  readonly fields : ITabelField[] = [
    {key: "id", label: "ID"},
    {key: "action", label: "Action"},
    {key: "timestamp", label: "Timestamp"},
    {key: "user", label: "User"},
  ]
  
    async ngOnInit() {
       try {
      const response = (await this.service.fetchAllLogs()).toPromise()
      response.then(res => {
        this.logs.set(res?.data!!)
      }, error => console.log("fetchAllLogs error:", error) )
    } catch(error) {
      console.log("fetchAllLogs error:", error)
      
    }

    }
}
