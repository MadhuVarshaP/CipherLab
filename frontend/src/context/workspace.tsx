"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type WalletType = "metamask" | "walletconnect" | "coinbase";

type Contributor = {
  name: string;
  wallet: string;
  role: string;
  contributionPercent: number;
  joinedAt: string;
};

type Dataset = {
  id: string;
  name: string;
  description: string;
  uploadedBy: string;
  uploadDate: string;
  status: "Encrypted";
  linkedJobs: number;
  access: "Private" | "Team";
};

type JobStatus = "Pending" | "Running" | "Completed" | "Failed";

type Job = {
  id: string;
  name: string;
  datasetId: string;
  datasetName: string;
  status: JobStatus;
  createdBy: string;
  createdAt: string;
  operationType: string;
  description: string;
};

type Result = {
  id: string;
  name: string;
  sourceJobId: string;
  sourceJobName: string;
  datasetsUsed: string[];
  contributors: string[];
  createdAt: string;
  summary: string;
};

type ActivityType =
  | "upload"
  | "compute"
  | "result"
  | "team"
  | "treasury"
  | "workspace";

type ActivityItem = {
  id: string;
  type: ActivityType;
  message: string;
  timestamp: string;
};

type TreasuryPayout = {
  id: string;
  txHash: string;
  amountEth: number;
  recipient: string;
  date: string;
};

type Workspace = {
  id: string;
  name: string;
  description: string;
  organization: string;
};

type WorkspaceState = {
  walletAddress: string | null;
  walletType: WalletType | null;
  workspace: Workspace | null;
  contributors: Contributor[];
  datasets: Dataset[];
  jobs: Job[];
  results: Result[];
  activities: ActivityItem[];
  treasuryBalanceEth: number;
  payouts: TreasuryPayout[];
};

type WorkspaceContextValue = WorkspaceState & {
  connectWallet: (wallet: WalletType) => void;
  disconnectWallet: () => void;
  createWorkspace: (data: {
    name: string;
    description: string;
    organization: string;
  }) => void;
  addTeamMember: (member: {
    name: string;
    wallet: string;
    role: string;
  }) => void;
  addDataset: (dataset: {
    name: string;
    description: string;
    access: "Private" | "Team";
  }) => void;
  addJob: (job: {
    id?: string;
    name: string;
    datasetId: string;
    operationType: string;
    description: string;
  }) => void;
  updateJobStatus: (jobId: string, status: JobStatus) => void;
  addResultForJob: (jobId: string) => void;
  addActivity: (item: Omit<ActivityItem, "id">) => void;
  simulatePayout: (recipientName: string, amountEth: number) => void;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

const MOCK_WALLET_ADDRESS =
  "0x9a4B7D2F12F2C3a984A3F1D2C98A56E3C11F9B21" as const;

function createInitialState(): WorkspaceState {
  return {
    walletAddress: null,
    walletType: null,
    workspace: null,
    contributors: [],
    datasets: [],
    jobs: [],
    results: [],
    activities: [],
    treasuryBalanceEth: 25.5,
    payouts: [],
  };
}

function createSeededState(): WorkspaceState {
  const base = createInitialState();

  const contributors: Contributor[] = [
    {
      name: "Alice",
      wallet: "0xA1...",
      role: "Researcher",
      contributionPercent: 35,
      joinedAt: "2025-01-10",
    },
    {
      name: "Bob",
      wallet: "0xB2...",
      role: "Data Scientist",
      contributionPercent: 25,
      joinedAt: "2025-01-12",
    },
    {
      name: "Carol",
      wallet: "0xC3...",
      role: "Analyst",
      contributionPercent: 20,
      joinedAt: "2025-01-14",
    },
    {
      name: "David",
      wallet: "0xD4...",
      role: "Reviewer",
      contributionPercent: 15,
      joinedAt: "2025-01-16",
    },
    {
      name: "Eve",
      wallet: "0xE5...",
      role: "Contributor",
      contributionPercent: 5,
      joinedAt: "2025-01-18",
    },
  ];

  const datasets: Dataset[] = [
    {
      id: "dataset_lung_scan",
      name: "Lung Scan Dataset",
      description:
        "Medical imaging dataset for tumor detection research across multi-institutional cohorts.",
      uploadedBy: "Alice",
      uploadDate: "2025-02-01",
      status: "Encrypted",
      linkedJobs: 3,
      access: "Team",
    },
    {
      id: "dataset_cancer_imaging",
      name: "Cancer Imaging Dataset",
      description:
        "Encrypted cancer imaging dataset with multi-modal MRI and CT scans.",
      uploadedBy: "Bob",
      uploadDate: "2025-02-05",
      status: "Encrypted",
      linkedJobs: 2,
      access: "Team",
    },
  ];

  const jobs: Job[] = [
    {
      id: "job_tumor_training",
      name: "Tumor Detection Training",
      datasetId: "dataset_lung_scan",
      datasetName: "Lung Scan Dataset",
      status: "Running",
      createdBy: "Bob",
      createdAt: "2025-02-10 14:32",
      operationType: "Model Training",
      description:
        "Train a convolutional neural network to detect lung tumors from encrypted scans.",
    },
    {
      id: "job_dataset_aggregation",
      name: "Dataset Aggregation",
      datasetId: "dataset_cancer_imaging",
      datasetName: "Cancer Imaging Dataset",
      status: "Completed",
      createdBy: "Carol",
      createdAt: "2025-02-08 11:04",
      operationType: "Dataset Aggregation",
      description:
        "Aggregate encrypted cancer imaging datasets from three partner hospitals.",
    },
  ];

  const results: Result[] = [
    {
      id: "result_accuracy_report",
      name: "Model Accuracy Report",
      sourceJobId: "job_tumor_training",
      sourceJobName: "Tumor Detection Training",
      datasetsUsed: ["Lung Scan Dataset"],
      contributors: ["Alice", "Bob"],
      createdAt: "2025-02-11 09:10",
      summary:
        "Tumor detection model achieved 92% accuracy with robust cross-site generalization.",
    },
    {
      id: "result_dataset_analysis",
      name: "Dataset Analysis Summary",
      sourceJobId: "job_dataset_aggregation",
      sourceJobName: "Dataset Aggregation",
      datasetsUsed: ["Cancer Imaging Dataset"],
      contributors: ["Bob", "Carol"],
      createdAt: "2025-02-09 16:22",
      summary:
        "Aggregated encrypted dataset across nodes with balanced class distribution and no leakage.",
    },
  ];

  const activities: ActivityItem[] = [
    {
      id: "act1",
      type: "upload",
      message: 'Alice uploaded dataset "Lung Scan Dataset"',
      timestamp: "2 minutes ago",
    },
    {
      id: "act2",
      type: "compute",
      message: 'Bob started compute job "Tumor Detection Training"',
      timestamp: "15 minutes ago",
    },
    {
      id: "act3",
      type: "result",
      message: 'Carol generated results "Model Accuracy Report"',
      timestamp: "1 hour ago",
    },
    {
      id: "act4",
      type: "treasury",
      message: "Distributed 5.4 ETH to contributors",
      timestamp: "Yesterday",
    },
  ];

  const payouts: TreasuryPayout[] = [
    {
      id: "payout1",
      txHash: "0xabc123",
      amountEth: 3.2,
      recipient: "Alice",
      date: "2025-02-02",
    },
    {
      id: "payout2",
      txHash: "0xdef456",
      amountEth: 2.4,
      recipient: "Bob",
      date: "2025-02-04",
    },
  ];

  return {
    ...base,
    walletAddress: MOCK_WALLET_ADDRESS,
    walletType: "walletconnect",
    workspace: {
      id: "workspace_9823",
      name: "AI Medical Research Collaboration",
      description:
        "A private collaboration environment for analyzing medical imaging datasets.",
      organization: "Global Health Research Lab",
    },
    contributors,
    datasets,
    jobs,
    results,
    activities,
    payouts,
  };
}

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WorkspaceState>(createInitialState);

  const value: WorkspaceContextValue = useMemo(
    () => ({
      ...state,
      connectWallet: (wallet) => {
        setState((prev) => ({
          ...prev,
          walletAddress: MOCK_WALLET_ADDRESS,
          walletType: wallet,
        }));
      },
      disconnectWallet: () => {
        setState(createInitialState());
      },
      createWorkspace: (data) => {
        setState(() => ({
          ...createSeededState(),
          workspace: {
            id: "workspace_9823",
            name: data.name,
            description: data.description,
            organization: data.organization,
          },
          walletAddress: MOCK_WALLET_ADDRESS,
        }));
      },
      addTeamMember: (member) => {
        setState((prev) => ({
          ...prev,
          contributors: [
            ...prev.contributors,
            {
              name: member.name || "New Member",
              wallet: member.wallet,
              role: member.role,
              contributionPercent: 0,
              joinedAt: new Date().toISOString().slice(0, 10),
            },
          ],
        }));
      },
      addDataset: (dataset) => {
        setState((prev) => ({
          ...prev,
          datasets: [
            ...prev.datasets,
            {
              id: `dataset_${prev.datasets.length + 1}`,
              name: dataset.name,
              description: dataset.description,
              uploadedBy: "You",
              uploadDate: new Date().toISOString().slice(0, 10),
              status: "Encrypted",
              linkedJobs: 0,
              access: dataset.access,
            },
          ],
        }));
      },
      addJob: (job) => {
        setState((prev) => {
          const dataset = prev.datasets.find((d) => d.id === job.datasetId);
          const newJob: Job = {
            id: job.id ?? `job_${prev.jobs.length + 1}`,
            name: job.name,
            datasetId: job.datasetId,
            datasetName: dataset?.name ?? "Unknown Dataset",
            status: "Pending",
            createdBy: "You",
            createdAt: new Date().toISOString(),
            operationType: job.operationType,
            description: job.description,
          };
          return {
            ...prev,
            jobs: [...prev.jobs, newJob],
          };
        });
      },
      updateJobStatus: (jobId, status) => {
        setState((prev) => ({
          ...prev,
          jobs: prev.jobs.map((job) =>
            job.id === jobId ? { ...job, status } : job
          ),
        }));
      },
      addResultForJob: (jobId) => {
        setState((prev) => {
          const job = prev.jobs.find((j) => j.id === jobId);
          if (!job) return prev;
          const dataset = prev.datasets.find((d) => d.id === job.datasetId);

          const newResult: Result = {
            id: `result_${prev.results.length + 1}`,
            name: `${job.name} Summary`,
            sourceJobId: job.id,
            sourceJobName: job.name,
            datasetsUsed: dataset ? [dataset.name] : [],
            contributors: prev.contributors.map((c) => c.name),
            createdAt: new Date().toISOString(),
            summary:
              "Mock output summary for this compute job. In production this would contain verifiable result metadata.",
          };

          return {
            ...prev,
            results: [...prev.results, newResult],
            activities: [
              {
                id: `act_${prev.activities.length + 1}`,
                type: "result",
                message: `Generated result "${newResult.name}" from job "${job.name}"`,
                timestamp: "Just now",
              },
              ...prev.activities,
            ],
          };
        });
      },
      addActivity: (item) => {
        setState((prev) => ({
          ...prev,
          activities: [
            {
              ...item,
              id: `act_${prev.activities.length + 1}`,
            },
            ...prev.activities,
          ],
        }));
      },
      simulatePayout: (recipientName, amountEth) => {
        setState((prev) => ({
          ...prev,
          treasuryBalanceEth: Math.max(
            0,
            prev.treasuryBalanceEth - amountEth
          ),
          payouts: [
            ...prev.payouts,
            {
              id: `payout_${prev.payouts.length + 1}`,
              txHash: `0x${Math.random().toString(16).slice(2, 10)}`,
              amountEth,
              recipient: recipientName,
              date: new Date().toISOString().slice(0, 10),
            },
          ],
        }));
      },
    }),
    [state]
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspaceContext() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error("useWorkspaceContext must be used within WorkspaceProvider");
  }
  return ctx;
}

