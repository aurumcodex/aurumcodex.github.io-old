/* Author: Nathan Adams */

$(document).ready(function() {
    // normal pathway script starts here
    $('#autoload').load('../narratives/psion_nar.html #init');
    $('.button_menu').load('../narratives/psion_nar.html #init_menu');
    $('.button_menu').on("click", "#barge_in", noTelepathyInit);
    $('.button_menu').on("click", "#use_telepathy", telepathyInit);

    // boss pathway script starts here
    $('#bossload').load('../narratives/psion_nar.html #boss_init');
    $('.boss_button_menu').load('../narratives/psion_nar.html #boss_init_menu');
    $('.boss_button_menu').on("click", "#bounce_back", boss_BounceOrb);
    $('.boss_button_menu').on("click", "#dodge_orb", boss_DodgeOrb);
});

// no telepathy path functions are denoted w/ nt 
function noTelepathyInit() {
    $('#autoload').load('../narratives/psion_nar.html #no_telepathy_1f');
    $('.button_menu').load('../narratives/psion_nar.html #no_telepathy_1f_menu');
    $('.button_menu').on("click", "#go_left", nt_1FDownCorridor);
    $('.button_menu').on("click", "#go_right", nt_1FToStairs);
}

function nt_1FDownCorridor() {
    $('#autoload').load('../narratives/psion_nar.html #no_tlpthy_1f_left');
    $('.button_menu').load('../narratives/psion_nar.html #no_tlpthy_1f_cont');
    $('.button_menu').on("click", "#ascend", nt_1FToStairs);
}

function nt_1FToStairs() {
    $('#autoload').load('../narratives/psion_nar.html #no_tlpthy_1f_right');
    $('.button_menu').load('../narratives/psion_nar.html #no_tlpthy_1f_cont');
    $('.button_menu').on("click", "#ascend", nt_to2F);
}

function nt_to2F() {
    $('#autoload').load('../narratives/psion_nar.html #no_telepathy_2f');
    $('.button_menu').load('../narratives/psion_nar.html #no_telepathy_2f_menu');
    $('.button_menu').on("click", "#room_search", nt_SearchRooms);
    $('.button_menu').on("click", "#to_oak_doors", nt_OakDoors);
}

function nt_SearchRooms() {
    $('#autoload').load('../narratives/psion_nar.html #no_telepathy_2f_srch');
    $('.button_menu').load('../narratives/psion_nar.html #no_telepathy_2f_cont');
    $('.button_menu').on("click", "#onwards", nt_OakDoors);
}

function nt_OakDoors() {
    $('#autoload').load('../narratives/psion_nar.html #no_telepathy_2f_hall');
    $('.button_menu').load('../narratives/psion_nar.html #no_telepathy_2f_cont');
    $('.button_menu').on("click", "#onwards", toPsiBossPage);
}

// telepathy path functions are denoted w/ nothing
function telepathyInit() {
    $('#autoload').load('../narratives/psion_nar.html #telepathy_1');
    $('.button_menu').load('../narratives/psion_nar.html #telepathy_menu_1');
    $('.button_menu').on("click", "#telepathy_bttn_1", telepathyPt2);
}

function telepathyPt2() {
    $('#autoload').load('../narratives/psion_nar.html #telepathy_2');
    $('.button_menu').load('../narratives/psion_nar.html #telepathy_menu_2');
    $('.button_menu').on("click", "#telepathy_bttn_2", telepathyPt3);
}

function telepathyPt3() {
    $('#autoload').load('../narratives/psion_nar.html #telepathy_3');
    $('.button_menu').load('../narratives/psion_nar.html #telepathy_menu_3');
    $('.button_menu').on("click", "#telepathy_bttn_3", telepathyPt4);
}

function telepathyPt4() {
    $('#autoload').load('../narratives/psion_nar.html #telepathy_4');
    $('.button_menu').load('../narratives/psion_nar.html #telepathy_menu_4');
    $('.button_menu').on("click", "#telepathy_bttn_4", telepathyPt5);
}

function telepathyPt5() {
    $('#autoload').load('../narratives/psion_nar.html #telepathy_5');
    $('.button_menu').load('../narratives/psion_nar.html #telepathy_menu_5');
    $('.button_menu').on("click", "#telepathy_bttn_5", toPsiBossPage);
}

// boss functions go here
function boss_DodgeOrb() {
    $('#bossload').load('../narratives/psion_nar.html #orb_dodge');
    $('.boss_button_menu').load('../narratives/psion_nar.html #orb_dodge_menu');
    $('.boss_button_menu').on("click", "#orb_demise", toDefeatPage);
    // $('.boss_button_menu').on("click", "#dodge_orb", boss_DodgeOrb);
}

function boss_BounceOrb() {
    $('#bossload').load('../narratives/psion_nar.html #orb_bounce');
    $('.boss_button_menu').load('../narratives/psion_nar.html #bounce_orb_menu');
    $('.boss_button_menu').on("click", "#success", toVictoryPage);
    // $('.boss_button_menu').on("click", "#dodge_orb", boss_DodgeOrb);
}

function toPsiBossPage() { window.location.href = "./psion_boss.html"; }
function toDefeatPage() { window.location.href = "./defeat.html"; }
function toVictoryPage() { window.location.href = "./victory.html"; }