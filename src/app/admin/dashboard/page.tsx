"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LogOut, Settings, Database, Cpu, HardDrive, ShieldAlert, Activity, CheckCircle, Server } from "lucide-react";

export default function AdminDashboard() {
  const [nodes, setNodes] = useState([
    { id: "Node-1", type: "Compile Sandbox", region: "CS Lab 1 Subnet", load: "12%", status: "online" },
    { id: "Node-2", type: "Compile Sandbox", region: "CS Lab 2 Subnet", load: "8%", status: "online" },
    { id: "Node-3", type: "Compile Sandbox", region: "Main Data Center", load: "42%", status: "online" },
    { id: "Node-4", type: "Backup Database", region: "Main Data Center", load: "2%", status: "online" }
  ]);

  const [systemLogs, setSystemLogs] = useState([
    { id: "1", time: "11:50:04", node: "Node-3", event: "SSL Handshake verified: Student 22CSE104", status: "success" },
    { id: "2", time: "11:49:12", node: "Node-1", event: "Docker sandbox container recycled", status: "info" },
    { id: "3", time: "11:45:00", node: "Node-3", event: "Database backup scheduled run completed", status: "success" },
    { id: "4", time: "11:30:12", node: "Node-2", event: "Compiler warning limit configuration updated", status: "info" }
  ]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none text-xs">
      
      {/* Header bar */}
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-slate-700 p-2 rounded-lg text-white font-bold flex items-center justify-center w-8 h-8">
            AD
          </div>
          <div>
            <h3 className="font-semibold text-sm tracking-wide">EXAMCODER ADMIN</h3>
            <p className="text-slate-400 text-xs">Institutional Network Administrator Node</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="font-bold text-slate-200">Root Administrator</p>
            <p className="text-[10px] text-slate-400 font-mono">admin@examcoder.edu • Admin ID: AD_88</p>
          </div>
          <Link 
            href="/admin/analytics" 
            className="text-blue-400 hover:text-white hover:bg-slate-800 border border-blue-500/20 px-3 py-2 rounded-md transition-all flex items-center gap-1.5 font-bold"
          >
            <Activity className="w-3.5 h-3.5" /> Analytics Console
          </Link>
          <Link 
            href="/admin/login" 
            className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-md transition-all flex items-center gap-1 font-bold"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </Link>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-6">
        
        {/* Core status cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-slate-700 rounded-md">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Active Nodes</p>
              <p className="text-xl font-bold text-slate-900">4 / 4 Online</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-slate-700 rounded-md">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Database Health</p>
              <p className="text-xl font-bold text-slate-900">100% Sync</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-slate-700 rounded-md">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Average CPU Load</p>
              <p className="text-xl font-bold text-slate-900">16% Load</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-slate-700 rounded-md">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Storage Allocation</p>
              <p className="text-xl font-bold text-slate-900">86% Available</p>
            </div>
          </div>
        </div>

        {/* Node status and operations logs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Nodes grid */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Cluster Compiler Nodes Status</h2>
            <div className="grid gap-3">
              {nodes.map((node) => (
                <div key={node.id} className="bg-white border border-slate-200 p-4 rounded-lg shadow-xs flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{node.id}</span>
                      <span className="text-slate-400 font-medium font-mono text-[9px]">{node.region}</span>
                    </div>
                    <p className="text-slate-500">{node.type}</p>
                  </div>
                  
                  <div className="flex items-center gap-6 text-right">
                    <div>
                      <p className="text-slate-400 text-[10px]">CPU load</p>
                      <p className="font-semibold text-slate-800">{node.load}</p>
                    </div>
                    <div>
                      <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                        {node.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System logs */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">System Event Audit logs</h2>
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
              <div className="p-3 border-b border-slate-150 bg-slate-55 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase">
                <span>Timestamp & Node</span>
                <span>Event description</span>
              </div>
              <div className="divide-y divide-slate-100 font-mono text-[10px]">
                {systemLogs.map((log) => (
                  <div key={log.id} className="p-3 flex items-start gap-3 hover:bg-slate-50 transition-colors">
                    <div className="shrink-0 text-slate-400 text-right">
                      <p>{log.time}</p>
                      <p className="text-[9px] text-slate-500 font-bold">{log.node}</p>
                    </div>
                    <div className="flex-1 text-slate-700 leading-normal">
                      {log.event}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
