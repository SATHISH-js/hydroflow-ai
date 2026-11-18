import os
import matplotlib
matplotlib.use('Agg')
matplotlib.rcParams['font.sans-serif'] = ['Nirmala UI', 'Segoe UI', 'DejaVu Sans']
matplotlib.rcParams['font.family'] = 'sans-serif'
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

# Ensure output directory for images
img_dir = os.path.join("d:\\water", "doc_assets")
os.makedirs(img_dir, exist_ok=True)

# Colors
NAVY = "#060d19"
SURFACE = "#0e1e34"
CYAN = "#00f0ff"
WATER = "#0ea5e9"
GREEN = "#10b981"
DARK_GRAY = "#1f2937"
TEXT_WHITE = "#ffffff"
TEXT_MUTED = "#94a3b8"

# -------------------------------------------------------------
# FIGURE 1: Homepage & Hydraulic Theme Visual
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(10, 4.2), facecolor=NAVY)
ax.set_facecolor(NAVY)
ax.set_xlim(0, 10)
ax.set_ylim(0, 4.2)
ax.axis('off')

# Header bar mockup
hdr = patches.FancyBboxPatch((0.4, 3.5), 9.2, 0.55, boxstyle="round,pad=0.04", fc=SURFACE, ec=CYAN, lw=1.2)
ax.add_patch(hdr)
ax.text(0.7, 3.75, "HYDROFLOW AI", color=CYAN, fontsize=13, fontweight='bold', va='center')
ax.text(2.6, 3.75, "|   Home   |   Hardy Cross   |   Equivalent Pipe   |   Camera Scanner   |   Theme: Hydraulic Blue", color=TEXT_WHITE, fontsize=9, va='center')
ax.text(9.2, 3.75, "[ EN | தமிழ் ]", color=WATER, fontsize=9, fontweight='bold', ha='right', va='center')

# Left Panel: Hero Banner Card
card1 = patches.FancyBboxPatch((0.4, 0.4), 4.4, 2.9, boxstyle="round,pad=0.06", fc=SURFACE, ec=WATER, lw=1.2)
ax.add_patch(card1)
ax.text(0.7, 2.9, "SMART FLUID DYNAMICS v2.4", color=CYAN, fontsize=8, fontweight='bold')
ax.text(0.7, 2.45, "Precision Hydraulic Engineering", color=TEXT_WHITE, fontsize=13, fontweight='bold')
ax.text(0.7, 2.15, "Loop network balancing & compound pipe solver.", color=TEXT_MUTED, fontsize=9)
ax.text(0.7, 1.8, "• Hardy Cross Iterative Loop Relaxation", color=TEXT_WHITE, fontsize=8.5)
ax.text(0.7, 1.55, "• Dupuit's Series & Parallel Equivalent Pipe", color=TEXT_WHITE, fontsize=8.5)
ax.text(0.7, 1.3, "• AI Assistant (English & தமிழ்) + OCR Scanner", color=TEXT_WHITE, fontsize=8.5)

btn1 = patches.FancyBboxPatch((0.7, 0.65), 1.7, 0.45, boxstyle="round,pad=0.04", fc=CYAN, ec="none")
ax.add_patch(btn1)
ax.text(1.55, 0.87, "Start Calculating", color="#041224", fontsize=9, fontweight='bold', ha='center', va='center')

btn2 = patches.FancyBboxPatch((2.6, 0.65), 1.9, 0.45, boxstyle="round,pad=0.04", fc=NAVY, ec=CYAN, lw=1)
ax.add_patch(btn2)
ax.text(3.55, 0.87, "Ask HydroBot AI", color=CYAN, fontsize=9, fontweight='bold', ha='center', va='center')

# Right Panel: Pipe Network & Gauge Mockup
card2 = patches.FancyBboxPatch((5.1, 0.4), 4.5, 2.9, boxstyle="round,pad=0.06", fc=SURFACE, ec=CYAN, lw=1.2)
ax.add_patch(card2)

# Closed Loop Pipeline Graphic
loop = patches.FancyBboxPatch((5.5, 0.7), 2.1, 2.2, boxstyle="round,pad=0.08", fc="#071526", ec="#1e3d6b", lw=8)
ax.add_patch(loop)
loop_inner = patches.FancyBboxPatch((5.5, 0.7), 2.1, 2.2, boxstyle="round,pad=0.08", fc="none", ec=CYAN, lw=1.5, ls="--")
ax.add_patch(loop_inner)

ax.plot([5.5, 7.6], [2.9, 2.9], color=CYAN, lw=2)
ax.plot([7.6, 7.6], [2.9, 0.7], color=CYAN, lw=2)
ax.plot([7.6, 5.5], [0.7, 0.7], color=CYAN, lw=2)
ax.plot([5.5, 5.5], [0.7, 2.9], color=CYAN, lw=2)

ax.text(6.55, 3.0, "Pipe AB (Q=0.05 m³/s)", color=CYAN, fontsize=7.5, ha='center')
ax.text(7.9, 1.8, "Pipe BC", color=CYAN, fontsize=7.5, rotation=-90, va='center')
ax.text(6.55, 0.5, "Pipe CD", color=CYAN, fontsize=7.5, ha='center')
ax.text(5.2, 1.8, "Pipe DA", color=CYAN, fontsize=7.5, rotation=90, va='center')

# Gauge Dial on the Right
gauge_circ = patches.Circle((8.6, 1.8), 0.75, fc="#050e1a", ec=CYAN, lw=2)
ax.add_patch(gauge_circ)
ax.plot([8.6, 8.85], [1.8, 2.25], color="#f43f5e", lw=2.5) # Needle
ax.text(8.6, 1.45, "3.85 m", color=TEXT_WHITE, fontsize=10, fontweight='bold', ha='center')
ax.text(8.6, 1.25, "Head Loss", color=TEXT_MUTED, fontsize=7, ha='center')
badge = patches.FancyBboxPatch((7.9, 0.65), 1.4, 0.35, boxstyle="round,pad=0.02", fc="#064e3b", ec=GREEN, lw=1)
ax.add_patch(badge)
ax.text(8.6, 0.82, "EQUILIBRIUM", color=GREEN, fontsize=7, fontweight='bold', ha='center', va='center')

plt.tight_layout()
fig1_path = os.path.join(img_dir, "page1_hero.png")
plt.savefig(fig1_path, dpi=200, bbox_inches='tight')
plt.close()

# -------------------------------------------------------------
# FIGURE 2: Hardy Cross Method Diagram & Result Mockup
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(10, 4.2), facecolor=NAVY)
ax.set_facecolor(NAVY)
ax.set_xlim(0, 10)
ax.set_ylim(0, 4.2)
ax.axis('off')

# Outer Frame
panel = patches.FancyBboxPatch((0.4, 0.3), 9.2, 3.6, boxstyle="round,pad=0.06", fc=SURFACE, ec=CYAN, lw=1.2)
ax.add_patch(panel)

# Title
ax.text(0.7, 3.6, "HARDY CROSS METHOD – CLOSED LOOP NETWORK SOLVER", color=CYAN, fontsize=11, fontweight='bold')
ax.text(0.7, 3.35, "Darcy-Weisbach head loss:  hf = r * Q * |Q|   |   Correction:  Delta Q = - Sum(hf) / Sum(2r|Q|)", color=TEXT_MUTED, fontsize=8.5)

# Left: 4-Pipe Network Topology
net_box = patches.FancyBboxPatch((0.7, 0.6), 3.8, 2.5, boxstyle="round,pad=0.04", fc="#071526", ec="#1e3d6b", lw=1)
ax.add_patch(net_box)
ax.text(2.6, 2.85, "Closed Loop Network (Single Circuit)", color=TEXT_WHITE, fontsize=9, fontweight='bold', ha='center')

# Circuit nodes A, B, C, D
coords = {'A': (1.4, 2.3), 'B': (3.6, 2.3), 'C': (3.6, 1.1), 'D': (1.4, 1.1)}
for node, (x, y) in coords.items():
    circ = patches.Circle((x, y), 0.16, fc="#0f2b48", ec=CYAN, lw=1.8)
    ax.add_patch(circ)
    ax.text(x, y, node, color=TEXT_WHITE, fontsize=8, fontweight='bold', ha='center', va='center')

# Connecting Pipes
ax.annotate("", xy=coords['B'], xytext=coords['A'], arrowprops=dict(arrowstyle="->", color=CYAN, lw=2))
ax.annotate("", xy=coords['C'], xytext=coords['B'], arrowprops=dict(arrowstyle="->", color=CYAN, lw=2))
ax.annotate("", xy=coords['D'], xytext=coords['C'], arrowprops=dict(arrowstyle="->", color=WATER, lw=2))
ax.annotate("", xy=coords['A'], xytext=coords['D'], arrowprops=dict(arrowstyle="->", color=WATER, lw=2))

ax.text(2.5, 2.45, "AB: L=600m, D=0.30m (+Q)", color=CYAN, fontsize=7, ha='center')
ax.text(3.9, 1.7, "BC: L=600m\nD=0.25m", color=CYAN, fontsize=7, va='center')
ax.text(2.5, 0.9, "CD: L=600m, D=0.20m (-Q)", color=WATER, fontsize=7, ha='center')
ax.text(0.9, 1.7, "DA: L=600m\nD=0.25m", color=WATER, fontsize=7, va='center')

# Center Clockwise Arrow Loop Indicator
ax.text(2.5, 1.7, "CW Loop (+)", color="#38bdf8", fontsize=9, fontweight='bold', ha='center')

# Right: Calculation Table & Balanced Result Card
tbl_box = patches.FancyBboxPatch((4.7, 1.3), 4.7, 1.8, boxstyle="round,pad=0.04", fc="#050e1a", ec=WATER, lw=1)
ax.add_patch(tbl_box)
ax.text(4.9, 2.85, "Iteration 3 – Final Convergence Summary", color=CYAN, fontsize=9, fontweight='bold')

headers = ["Pipe", "L (m)", "D (m)", "r", "Init Q", "Final Q", "hf (m)"]
x_pos = [4.9, 5.5, 6.1, 6.7, 7.3, 8.0, 8.8]
for h, x in zip(headers, x_pos):
    ax.text(x, 2.58, h, color=TEXT_MUTED, fontsize=7.5, fontweight='bold')

data = [
    ["AB", "600", "0.30", "28.1", "+0.050", "+0.0615", "+0.106"],
    ["BC", "600", "0.25", "69.8", "+0.020", "+0.0315", "+0.069"],
    ["CD", "600", "0.20", "213.2", "-0.030", "-0.0185", "-0.073"],
    ["DA", "600", "0.25", "69.8", "-0.050", "-0.0385", "-0.103"]
]
y_start = 2.32
for row in data:
    for val, x in zip(row, x_pos):
        c = TEXT_WHITE if val != row[5] else GREEN
        ax.text(x, y_start, val, color=c, fontsize=7)
    y_start -= 0.22

# Bottom Status Badges
badge_bal = patches.FancyBboxPatch((4.7, 0.6), 2.2, 0.55, boxstyle="round,pad=0.03", fc="#064e3b", ec=GREEN, lw=1.5)
ax.add_patch(badge_bal)
ax.text(5.8, 0.87, "[OK] NETWORK BALANCED", color=GREEN, fontsize=8, fontweight='bold', ha='center', va='center')

badge_dq = patches.FancyBboxPatch((7.1, 0.6), 2.3, 0.55, boxstyle="round,pad=0.03", fc="#082f49", ec=CYAN, lw=1.2)
ax.add_patch(badge_dq)
ax.text(8.25, 0.87, "|Delta Q| = 0.000008 < 0.0001", color=CYAN, fontsize=8, fontweight='bold', ha='center', va='center')

plt.tight_layout()
fig2_path = os.path.join(img_dir, "page2_hardycross.png")
plt.savefig(fig2_path, dpi=200, bbox_inches='tight')
plt.close()

# -------------------------------------------------------------
# FIGURE 3: Equivalent Pipe Method (Series & Parallel)
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(10, 4.2), facecolor=NAVY)
ax.set_facecolor(NAVY)
ax.set_xlim(0, 10)
ax.set_ylim(0, 4.2)
ax.axis('off')

panel = patches.FancyBboxPatch((0.4, 0.3), 9.2, 3.6, boxstyle="round,pad=0.06", fc=SURFACE, ec=CYAN, lw=1.2)
ax.add_patch(panel)
ax.text(0.7, 3.6, "EQUIVALENT PIPE METHOD – SERIES & PARALLEL SCHEMATICS", color=CYAN, fontsize=11, fontweight='bold')
ax.text(0.7, 3.35, "Dupuit's Series: (fe*Le)/De^5 = Sum (fi*Li)/Di^5   |   Parallel: De^2.5 / sqrt(fe*Le) = Sum Di^2.5 / sqrt(fi*Li)", color=TEXT_MUTED, fontsize=8.5)

# Left Side: Series System
sub1 = patches.FancyBboxPatch((0.7, 0.6), 4.2, 2.5, boxstyle="round,pad=0.04", fc="#071526", ec=WATER, lw=1)
ax.add_patch(sub1)
ax.text(0.9, 2.85, "1. Pipes in Series (Dupuit's Eq.)", color=TEXT_WHITE, fontsize=9.5, fontweight='bold')

# Series Pipes Draw
ax.add_patch(patches.Rectangle((0.9, 2.1), 1.1, 0.35, fc="#1e3a5f", ec=CYAN, lw=1.2))
ax.text(1.45, 2.27, "S1: D=0.3m", color=TEXT_WHITE, fontsize=7, ha='center', va='center')

ax.add_patch(patches.Rectangle((2.0, 2.15), 0.9, 0.25, fc="#2a5282", ec=CYAN, lw=1.2))
ax.text(2.45, 2.27, "S2: D=0.2m", color=TEXT_WHITE, fontsize=7, ha='center', va='center')

ax.add_patch(patches.Rectangle((2.9, 2.1), 1.6, 0.35, fc="#1e3a5f", ec=CYAN, lw=1.2))
ax.text(3.7, 2.27, "S3: D=0.25m, L=400m", color=TEXT_WHITE, fontsize=7, ha='center', va='center')

ax.annotate("", xy=(4.7, 2.27), xytext=(0.7, 2.27), arrowprops=dict(arrowstyle="->", color=CYAN, lw=1, ls="--"))

ax.text(0.9, 1.7, "Equivalent Uniform Pipe (Le = 2814 m, De = 0.30 m):", color=GREEN, fontsize=7.5, fontweight='bold')
ax.add_patch(patches.Rectangle((0.9, 1.25), 3.6, 0.35, fc="#064e3b", ec=GREEN, lw=1.5))
ax.text(2.7, 1.42, "De = 0.30 m   |   Le = 2814.1 meters   |   HL = 3.85 m", color=TEXT_WHITE, fontsize=8, ha='center', va='center')
ax.text(0.9, 0.85, "• Constant Flow: Q1 = Q2 = Q3 = Q (0.08 m³/s)\n• Additive Head Loss: HL = hf1 + hf2 + hf3", color=TEXT_MUTED, fontsize=7)

# Right Side: Parallel System
sub2 = patches.FancyBboxPatch((5.1, 0.6), 4.3, 2.5, boxstyle="round,pad=0.04", fc="#071526", ec=WATER, lw=1)
ax.add_patch(sub2)
ax.text(5.3, 2.85, "2. Pipes in Parallel (Divided Flow)", color=TEXT_WHITE, fontsize=9.5, fontweight='bold')

# Parallel branches
ax.plot([5.3, 5.7], [2.2, 2.2], color=CYAN, lw=2) # inlet
ax.plot([5.7, 5.7], [2.6, 1.8], color=CYAN, lw=2) # junction left
ax.plot([8.5, 8.5], [2.6, 1.8], color=CYAN, lw=2) # junction right
ax.plot([8.5, 8.9], [2.2, 2.2], color=CYAN, lw=2) # outlet

ax.add_patch(patches.Rectangle((5.7, 2.45), 2.8, 0.3, fc="#1e3a5f", ec=CYAN, lw=1))
ax.text(7.1, 2.6, "Branch 1: L=600m, D=0.3m (Q1 = 0.052 m³/s)", color=TEXT_WHITE, fontsize=7, ha='center', va='center')

ax.add_patch(patches.Rectangle((5.7, 1.65), 2.8, 0.3, fc="#2a5282", ec=CYAN, lw=1))
ax.text(7.1, 1.8, "Branch 2: L=800m, D=0.4m (Q2 = 0.068 m³/s)", color=TEXT_WHITE, fontsize=7, ha='center', va='center')

ax.text(5.3, 1.35, "Equivalent Single Pipe (De = 0.35 m, Le = 168.1 m):", color=GREEN, fontsize=7.5, fontweight='bold')
ax.add_patch(patches.Rectangle((5.3, 0.95), 3.8, 0.3, fc="#064e3b", ec=GREEN, lw=1.5))
ax.text(7.2, 1.1, "De = 0.35 m   |   Le = 168.1 m   |   Equal hf = 1.42 m", color=TEXT_WHITE, fontsize=8, ha='center', va='center')
ax.text(5.3, 0.7, "• Equal Head Loss Across All Branches: hf1 = hf2\n• Discharge Splitting: Q_total = Q1 + Q2 (0.12 m³/s)", color=TEXT_MUTED, fontsize=7)

plt.tight_layout()
fig3_path = os.path.join(img_dir, "page3_equivalentpipe.png")
plt.savefig(fig3_path, dpi=200, bbox_inches='tight')
plt.close()

# -------------------------------------------------------------
# FIGURE 4: Camera Scanner & OCR Workflow Mockup
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(10, 4.2), facecolor=NAVY)
ax.set_facecolor(NAVY)
ax.set_xlim(0, 10)
ax.set_ylim(0, 4.2)
ax.axis('off')

panel = patches.FancyBboxPatch((0.4, 0.3), 9.2, 3.6, boxstyle="round,pad=0.06", fc=SURFACE, ec=CYAN, lw=1.2)
ax.add_patch(panel)
ax.text(0.7, 3.6, "SMART CAMERA SCANNER & OCR PARAMETER EXTRACTION", color=CYAN, fontsize=11, fontweight='bold')
ax.text(0.7, 3.35, "Scan textbook problems or lab manual tables via live video stream or image file upload.", color=TEXT_MUTED, fontsize=8.5)

# Step 1: Camera Viewport Mockup
cam_box = patches.FancyBboxPatch((0.7, 0.6), 4.2, 2.5, boxstyle="round,pad=0.04", fc="#000000", ec=CYAN, lw=1.5)
ax.add_patch(cam_box)
ax.text(2.8, 2.85, "Live Camera Viewfinder (Tesseract OCR)", color=CYAN, fontsize=8.5, fontweight='bold', ha='center')

# Laser line
ax.plot([0.9, 4.7], [2.1, 2.1], color=CYAN, lw=2.5)
ax.text(2.8, 2.15, "-- ACTIVE LASER SCANNING BEAM --", color=CYAN, fontsize=7, ha='center')

# Sample scanned problem sheet
sheet = patches.Rectangle((1.1, 0.8), 3.4, 1.1, fc="#ffffff", ec="#94a3b8", lw=1)
ax.add_patch(sheet)
ax.text(1.2, 1.65, "Civil Eng. Hydraulics Lab - Exp 4", color="#0f172a", fontsize=7, fontweight='bold')
ax.text(1.2, 1.45, "Pipe AB: L = 600m, D = 300mm, Q = 50 lps", color="#1e293b", fontsize=6.5)
ax.text(1.2, 1.25, "Pipe BC: L = 600m, D = 250mm, Q = 20 lps", color="#1e293b", fontsize=6.5)
ax.text(1.2, 1.05, "Pipe CD: L = 600m, D = 200mm, Q = -30 lps", color="#1e293b", fontsize=6.5)
ax.text(1.2, 0.85, "Pipe DA: L = 600m, D = 250mm, Q = -50 lps", color="#1e293b", fontsize=6.5)

# Arrow to Step 2
ax.annotate("", xy=(5.2, 1.8), xytext=(4.8, 1.8), arrowprops=dict(arrowstyle="->", color=GREEN, lw=3))

# Step 2: Extracted Numerical Table (Editable)
ext_box = patches.FancyBboxPatch((5.4, 0.6), 4.0, 2.5, boxstyle="round,pad=0.04", fc="#071526", ec=GREEN, lw=1.2)
ax.add_patch(ext_box)
ax.text(7.4, 2.85, "Extracted Numerical Values (Editable)", color=GREEN, fontsize=8.5, fontweight='bold', ha='center')

headers = ["Pipe", "L (m)", "D (m)", "Q (m³/s)", "f"]
x_coords = [5.6, 6.2, 6.9, 7.8, 8.7]
for h, x in zip(headers, x_coords):
    ax.text(x, 2.55, h, color=TEXT_MUTED, fontsize=7.5, fontweight='bold')

extracted_data = [
    ["AB", "600", "0.30", "0.050", "0.02"],
    ["BC", "600", "0.25", "0.020", "0.02"],
    ["CD", "600", "0.20", "-0.030", "0.02"],
    ["DA", "600", "0.25", "-0.050", "0.02"]
]
y_row = 2.25
for r in extracted_data:
    for val, x in zip(r, x_coords):
        ax.text(x, y_row, val, color=TEXT_WHITE, fontsize=7.5)
    y_row -= 0.25

btn_solve1 = patches.FancyBboxPatch((5.6, 0.8), 1.8, 0.4, boxstyle="round,pad=0.03", fc=CYAN, ec="none")
ax.add_patch(btn_solve1)
ax.text(6.5, 1.0, "Confirm & Solve (Hardy)", color="#041224", fontsize=7, fontweight='bold', ha='center', va='center')

btn_solve2 = patches.FancyBboxPatch((7.6, 0.8), 1.6, 0.4, boxstyle="round,pad=0.03", fc=NAVY, ec=CYAN, lw=1)
ax.add_patch(btn_solve2)
ax.text(8.4, 1.0, "Solve (Equiv)", color=CYAN, fontsize=7, fontweight='bold', ha='center', va='center')

plt.tight_layout()
fig4_path = os.path.join(img_dir, "page4_scanner.png")
plt.savefig(fig4_path, dpi=200, bbox_inches='tight')
plt.close()

# -------------------------------------------------------------
# FIGURE 5: HydroBot AI Assistant & Bilingual Localization
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(10, 4.2), facecolor=NAVY)
ax.set_facecolor(NAVY)
ax.set_xlim(0, 10)
ax.set_ylim(0, 4.2)
ax.axis('off')

panel = patches.FancyBboxPatch((0.4, 0.3), 9.2, 3.6, boxstyle="round,pad=0.06", fc=SURFACE, ec=CYAN, lw=1.2)
ax.add_patch(panel)
ax.text(0.7, 3.6, "HYDROBOT AI TUTOR & BILINGUAL LOCALIZATION (ENGLISH & தமிழ்)", color=CYAN, fontsize=11, fontweight='bold')
ax.text(0.7, 3.35, "Intelligent rule-based hydraulic tutor explaining equations, loop balancing, and sign rules.", color=TEXT_MUTED, fontsize=8.5)

# Left: Chat Window Mockup
chat_box = patches.FancyBboxPatch((0.7, 0.6), 4.3, 2.5, boxstyle="round,pad=0.04", fc="#050e1a", ec=WATER, lw=1.2)
ax.add_patch(chat_box)
ax.text(0.9, 2.85, "HydroBot AI – Hydraulic Assistant", color=CYAN, fontsize=9, fontweight='bold')

# Message 1 (Bot)
b1 = patches.FancyBboxPatch((0.9, 2.2), 3.2, 0.45, boxstyle="round,pad=0.04", fc="#0f2b48", ec=WATER, lw=0.8)
ax.add_patch(b1)
ax.text(1.0, 2.42, "வணக்கம்! How can I assist your calculations today?", color=TEXT_WHITE, fontsize=7.5)

# Message 2 (User)
b2 = patches.FancyBboxPatch((1.6, 1.65), 3.2, 0.45, boxstyle="round,pad=0.04", fc="#0284c7", ec="none")
ax.add_patch(b2)
ax.text(1.7, 1.87, "ஹார்டி கிராஸ் முறை மற்றும் குறியீட்டு மரபு விளக்கு?", color=TEXT_WHITE, fontsize=7.5)

# Message 3 (Bot Answer)
b3 = patches.FancyBboxPatch((0.9, 1.05), 3.9, 0.5, boxstyle="round,pad=0.04", fc="#0f2b48", ec=GREEN, lw=1)
ax.add_patch(b3)
ax.text(1.0, 1.35, "Clockwise flow is (+), Counter-CW is (-).", color=GREEN, fontsize=7.5, fontweight='bold')
ax.text(1.0, 1.15, "Formula: Delta Q = - Sum(hf) / (2 * Sum|hf/Q|)", color=CYAN, fontsize=7)

# Right: Knowledge Base & Bilingual System
feat_box = patches.FancyBboxPatch((5.3, 0.6), 4.1, 2.5, boxstyle="round,pad=0.04", fc="#071526", ec=CYAN, lw=1)
ax.add_patch(feat_box)
ax.text(5.5, 2.85, "Dual-Language Engine & Pedagogical Support", color=TEXT_WHITE, fontsize=9, fontweight='bold')

features = [
    ("Instant Runtime Switching", "English and Tamil toggling without page reload"),
    ("Deterministic Knowledge Base", "Accurate answers for Darcy-Weisbach & Dupuit"),
    ("Audio Synthesizer (Web Audio)", "Soft water chirp acoustic feedback on send"),
    ("Quick Prompt Suggestions", "1-click chips for formulas and sign rules"),
    ("Offline & Zero API Dependency", "Guaranteed 100% uptime in classroom or exams")
]
y_f = 2.45
for title, desc in features:
    ax.text(5.5, y_f, "[OK] " + title, color=CYAN, fontsize=8, fontweight='bold')
    ax.text(5.7, y_f - 0.16, desc, color=TEXT_MUTED, fontsize=7)
    y_f -= 0.38

plt.tight_layout()
fig5_path = os.path.join(img_dir, "page5_hydrobot.png")
plt.savefig(fig5_path, dpi=200, bbox_inches='tight')
plt.close()

print("All 5 diagrams generated successfully!")

# -------------------------------------------------------------
# BUILD 5-PAGE MICROSOFT WORD (.DOCX) DOCUMENT
# -------------------------------------------------------------
doc = Document()

# Set Standard Margins (0.75 in)
for section in doc.sections:
    section.top_margin = Inches(0.75)
    section.bottom_margin = Inches(0.75)
    section.left_margin = Inches(0.75)
    section.right_margin = Inches(0.75)

def add_header(title, subtitle, page_num):
    p_num = doc.add_paragraph()
    p_num.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    r_num = p_num.add_run(f"HYDROFLOW AI SYSTEM DOCUMENTATION  |  PAGE {page_num} OF 5")
    r_num.font.name = 'Calibri'
    r_num.font.size = Pt(8.5)
    r_num.font.color.rgb = RGBColor(14, 165, 233)
    
    p_title = doc.add_paragraph()
    r_title = p_title.add_run(title)
    r_title.font.name = 'Arial'
    r_title.font.size = Pt(17)
    r_title.font.bold = True
    r_title.font.color.rgb = RGBColor(6, 78, 140)
    
    p_sub = doc.add_paragraph()
    r_sub = p_sub.add_run(subtitle)
    r_sub.font.name = 'Calibri'
    r_sub.font.size = Pt(10)
    r_sub.font.italic = True
    r_sub.font.color.rgb = RGBColor(100, 116, 139)
    p_sub.paragraph_format.space_after = Pt(6)

def add_image_centered(img_path, width_inches=6.8):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(8)
    p.add_run().add_picture(img_path, width=Inches(width_inches))

def add_section_heading(text):
    p = doc.add_paragraph()
    r = p.add_run(text)
    r.font.name = 'Arial'
    r.font.size = Pt(11)
    r.font.bold = True
    r.font.color.rgb = RGBColor(15, 23, 42)
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(2)

def add_body_paragraph(text):
    p = doc.add_paragraph()
    r = p.add_run(text)
    r.font.name = 'Calibri'
    r.font.size = Pt(9.5)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.line_spacing = 1.15

# =============================================================
# PAGE 1: Homepage & Hydraulic UI Design System
# =============================================================
add_header(
    "1. Homepage Architecture & Futuristic Hydraulic Design System",
    "Design philosophy, interactive water loop animations, dynamic pressure monitor, and multi-theme system",
    1
)
add_image_centered(fig1_path)

add_section_heading("A. Feature Overview & Design Philosophy")
add_body_paragraph(
    "HYDROFLOW AI is engineered as an accessible, high-precision web calculator for civil, mechanical, and environmental "
    "engineering students studying pipe flow networks. Departing from generic corporate forms, the interface adopts a cyber-hydraulic "
    "theme featuring deep oceanic navy backgrounds (#060d19), glowing cyan accents (#00f0ff), and water-blue fluid dynamics highlights. "
    "Glassmorphism surface panels utilize CSS backdrop-filter blur (14px) and semi-transparent layers to deliver depth, modern hierarchy, "
    "and optimal contrast for numeric readouts."
)

add_section_heading("B. Interactive Hydraulic Flow & Real-Time Pressure Gauge")
add_body_paragraph(
    "The homepage hero section integrates a live SVG pipe network loop. Inside the pipe geometry, animated fluid flow paths execute "
    "continuous CSS stroke-dasharray keyframe animations, visually demonstrating flow direction through nodes A, B, C, and D. "
    "At the heart of the loop sits an interactive pressure monitor gauge: whenever hydraulic calculations are executed, the gauge's "
    "needle dynamically rotates between -110° and +110° based on the computed head loss, accompanied by an instant equilibrium status badge."
)

add_section_heading("C. 3 Interchangeable Themes & Responsive Framework")
add_body_paragraph(
    "To accommodate varied lighting conditions and student preferences, the platform provides three instant themes via CSS custom properties: "
    "1) Hydraulic Blue (cyber aquatic navy), 2) Dark Cyber (high-contrast obsidian), and 3) Light Blueprint (crisp drafting paper mode). "
    "Preferences are persisted in browser localStorage. Built upon a Bootstrap 5 grid, the responsive layout provides touch-friendly mobile controls, "
    "fluid typography clamp(), and desktop multi-column cards without horizontal overflow."
)

# =============================================================
# PAGE 2: Hardy Cross Method Loop Solver
# =============================================================
doc.add_page_break()

add_header(
    "2. Hardy Cross Method – Iterative Closed Loop Network Solver",
    "Physical network equilibrium, Darcy-Weisbach head loss, Taylor series flow correction, and convergence verification",
    2
)
add_image_centered(fig2_path)

add_section_heading("A. Engineering Fundamentals & Equilibrium Laws")
add_body_paragraph(
    "The Hardy Cross method (developed by Prof. Hardy Cross in 1936) is an iterative relaxation technique for determining flow distribution "
    "in closed loop pipe circuits. It enforces two fundamental physical laws: 1) Continuity of mass at every junction (ΣQ_in = ΣQ_out), "
    "and 2) Head loss equilibrium around any closed circuit, requiring the algebraic summation of frictional head losses to equal zero: Σhf = 0."
)

add_section_heading("B. Mathematical Formulation & Flow Correction Derivation")
add_body_paragraph(
    "Head loss in each circular conduit is computed via the Darcy-Weisbach equation: hf = (f · L · Q²) / (12.103 · D⁵) = r · Q · |Q|, "
    "where r = (8·f·L) / (π²·g·D⁵) represents the hydraulic resistance coefficient. The sign convention treats clockwise flow as positive (+Q) "
    "and counter-clockwise flow as negative (-Q). Using a first-order Taylor expansion, the loop correction factor ΔQ is derived as: "
    "ΔQ = - [ Σ hf ] / [ n · Σ |hf / Q| ] = - [ Σ r · Q · |Q| ] / [ Σ 2 · r · |Q| ] (for n = 2). In each iteration, updated flow is Q_new = Q + ΔQ."
)

add_section_heading("C. Iteration Engine, Tabular Logs & Balanced Status")
add_body_paragraph(
    "The solver iteratively recalculates r, hf, and ΔQ until the convergence criterion |ΔQ| < 0.0001 m³/s is satisfied (or 10 iterations max). "
    "Students can dynamically add or remove pipes, inspect initial vs. corrected flows in both m³/s and L/s, and click iteration tabs "
    "(Iter 1, Iter 2, Iter 3) to view step-by-step intermediate calculations. Convergence is highlighted by a glowing green NETWORK BALANCED badge."
)

# =============================================================
# PAGE 3: Equivalent Pipe Method (Series & Parallel)
# =============================================================
doc.add_page_break()

add_header(
    "3. Equivalent Pipe Method – Series (Dupuit) & Parallel Networks",
    "Compound pipe replacement, Dupuit's equation, parallel branch head loss equality, and real-time SVG schematic",
    3
)
add_image_centered(fig3_path)

add_section_heading("A. Principle of Hydraulic Equivalence")
add_body_paragraph(
    "An equivalent pipe is a uniform single pipe of diameter De, length Le, and friction factor fe that carries the same total discharge "
    "as a compound pipe network while producing the exact same total head loss. This principle dramatically simplifies complex municipal networks "
    "into equivalent conduits for rapid hydraulic gradient modeling."
)

add_section_heading("B. Pipes in Series & Dupuit's Equation")
add_body_paragraph(
    "When pipes of varying diameters are connected end-to-end, flow is constant (Q1 = Q2 = ... = Q) and head losses are additive: "
    "HL = Σ hfi = Σ [ (fi · Li · Q²) / (12.1 · Di⁵) ]. Equating total loss to an equivalent pipe yields Dupuit's classical equation: "
    "(fe · Le) / De⁵ = Σ [ (fi · Li) / Di⁵ ]. The calculator allows students to select their calculation target: 1) Solve for equivalent length Le "
    "for a specified diameter De: Le = (De⁵ / fe) · Σ(fi·Li/Di⁵), or 2) Solve for equivalent diameter De for a given length Le: De = [(fe·Le) / Σ(fi·Li/Di⁵)]^0.2."
)

add_section_heading("C. Pipes in Parallel & Interactive Network Schematic")
add_body_paragraph(
    "For pipes branching in parallel, head loss across all branches is identical (hf1 = hf2 = ... = HL) while total flow splits: Q = Σ Qi. "
    "Conveyance ki = Di^2.5 / √(fi·Li) determines individual branch flow: Qi = Q · (ki / Σk). The equivalent relation is De^2.5 / √(fe·Le) = Σ [ Di^2.5 / √(fi·Li) ]. "
    "Below the calculations, an interactive SVG schematic renders proportional pipe segments, flow arrows, and dimensions in real time."
)

# =============================================================
# PAGE 4: Smart Camera Scanner & OCR Parameter Extraction
# =============================================================
doc.add_page_break()

add_header(
    "4. Smart Camera Scanner & OCR Numerical Parameter Extraction",
    "Real-time video capture, Tesseract OCR optical recognition, heuristic numeric parsing, and one-click solver population",
    4
)
add_image_centered(fig4_path)

add_section_heading("A. Optical Engineering Problem Capture")
add_body_paragraph(
    "Engineering students often work with printed textbook problems, lab manuals, and handwritten data sheets. To eliminate tedious "
    "manual transcription errors, HYDROFLOW AI incorporates a smart Camera Scanner. Leveraging the HTML5 MediaDevices API "
    "(navigator.mediaDevices.getUserMedia), the scanner opens the device camera with real-time video streaming, front/rear camera switching, "
    "and a simulated scanning laser beam. Alternatively, students can upload PNG or JPG image files."
)

add_section_heading("B. Tesseract.js OCR & Heuristic Classification Engine")
add_body_paragraph(
    "Captured image frames are rendered onto an offscreen canvas and processed by Tesseract.js (v5 client-side optical character recognition). "
    "The raw text stream is analyzed by an intelligent heuristic parser that classifies numbers into hydraulic parameters: "
    "1) Pipe ID (labels like AB, BC, P-1), 2) Length L (numbers ≥ 50m), 3) Diameter D (decimal values between 0.05m and 1.5m, or mm auto-converted to m), "
    "4) Flow Q (values typically between -1.0 and +1.0 m³/s, or LPS auto-converted to m³/s), and 5) Friction factor f (values around 0.015 - 0.03)."
)

add_section_heading("C. Editable Parameter Review & Direct Solver Injection")
add_body_paragraph(
    "Extracted parameters are presented in a clean, editable modal table. Students can verify, adjust, add, or delete any recognized row before "
    "applying. Two dedicated action buttons—'Confirm & Solve in Hardy Cross' and 'Confirm & Solve in Equivalent Pipe'—instantly populate the respective "
    "solver tables, switch to the calculation view, and execute the algorithm automatically."
)

# =============================================================
# PAGE 5: HydroBot AI Assistant & Bilingual Localization
# =============================================================
doc.add_page_break()

add_header(
    "5. HydroBot AI Assistant & Bilingual Localization (English & தமிழ்)",
    "Deterministic rule-based pedagogical tutor, acoustic Web Audio feedback, and client-side dual language dictionary",
    5
)
add_image_centered(fig5_path)

add_section_heading("A. Pedagogical AI Tutor – HydroBot")
add_body_paragraph(
    "HYDROFLOW AI includes a floating interactive assistant named HydroBot, anchored in the bottom-right corner with a water pulse indicator. "
    "HydroBot is designed to resolve conceptual hurdles that students encounter when studying hydraulic networks. It provides instant explanations "
    "of the Hardy Cross relaxation process, Dupuit's series formulation, parallel pipe flow distribution, Darcy-Weisbach head loss equations, "
    "and sign convention rules."
)

add_section_heading("B. Deterministic Knowledge Engine & Web Audio Feedback")
add_body_paragraph(
    "To ensure 100% offline availability in engineering classrooms and examination environments without external API costs or rate limits, "
    "HydroBot runs a deterministic, semantic keyword-matching engine. The interface features quick suggestion chips for common questions and "
    "generates a synthesized water droplet sound chirp upon message delivery using the browser Web Audio API oscillator, enhancing user engagement."
)

add_section_heading("C. Bilingual Engineering Localization (English & Tamil)")
add_body_paragraph(
    "Recognizing the linguistic diversity of engineering students, HYDROFLOW AI provides comprehensive bilingual support in both English and "
    "Tamil (தமிழ்). Over 85 localized keys cover all navigation items, form inputs, mathematical derivation logs, convergence alert badges, and "
    "HydroBot tutor responses. Language switching executes dynamically without page reload, ensuring a frictionless academic experience."
)

# Save Document
doc_path = os.path.join("d:\\water", "HYDROFLOW_AI_System_Documentation.docx")
doc.save(doc_path)
print(f"Word document saved to: {doc_path}")
