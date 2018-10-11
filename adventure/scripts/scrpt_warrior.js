/* Author: Nathan Adams */

var get_skunk = false;

$(document).ready(function() {
    // normal pathway script starts here
    // sessionStorage.setItem("skunk_key", get_skunk);
    $('#autoload').load('../narratives/warrior_nar.html #init');
    $('.button_menu').load('../narratives/warrior_nar.html #init_menu');
    $('.button_menu').on("click", "#common_bttn", takeCommon);
    $('.button_menu').on("click", "#decrepit_bttn", takeDecrepit);

    // boss pathway script starts here
    $('#bossload').load('../narratives/warrior_nar.html #boss_init');
    $('.boss_button_menu').load('../narratives/warrior_nar.html #boss_init_menu');
    console.log("got skunk? :: " + sessionStorage.getItem("skunk_key"));
    $('.boss_button_menu').on("click", "#boss_go_left", boss_DodgeMeetDemise);
    $('.boss_button_menu').on("click", "#boss_go_right", boss_DodgeSuccess);
});

// common path functions are denoted w/ cmmn
function takeCommon() {
    $('#autoload').load('../narratives/warrior_nar.html #common_path');
    $('.button_menu').load('../narratives/warrior_nar.html #common_path_menu');
    $('.button_menu').on("click", "#follow_tracks", cmmnFollowTracks);
    $('.button_menu').on("click", "#ignore_tracks", cmmnIgnoreTracks);
}

function cmmnFollowTracks() {
    $('#autoload').load('../narratives/warrior_nar.html #followed_tracks');
    $('.button_menu').load('../narratives/warrior_nar.html #followed_tracks_menu');
    $('.button_menu').on("click", "#cont_tracks", cmmnMeetSkunk);
    // $('.button_menu').on("click", "#ignore_tracks", cmmnIgnoreTracks);
}

function cmmnMeetSkunk() {
    get_skunk = true;
    sessionStorage.setItem("skunk_key", get_skunk);
    $('#autoload').load('../narratives/warrior_nar.html #injured_skunk');
    $('.button_menu').load('../narratives/warrior_nar.html #inj_skunk_menu');
    $('.button_menu').on("click", "#skunk_continue", cmmnReturnPath);
}

function cmmnReturnPath() {
    $('#autoload').load('../narratives/warrior_nar.html #return_to_path');
    $('.button_menu').load('../narratives/warrior_nar.html #path_return_menu');
    $('.button_menu').on("click", "#crossroads_bttn", toCrossroads);
}

function cmmnIgnoreTracks() {
    $('#autoload').load('../narratives/warrior_nar.html #ignored_tracks');
    $('.button_menu').load('../narratives/warrior_nar.html #path_return_menu');
    $('.button_menu').on("click", "#crossroads_bttn", toCrossroads);
    // $('.button_menu').on("click", "#ignore_tracks", cmmnIgnoreTracks);
}

// decrepit path functions are denoted w/ dcrp
function takeDecrepit() {
    $('#autoload').load('../narratives/warrior_nar.html #decrepit_path');
    $('.button_menu').load('../narratives/warrior_nar.html #decrepit_path_menu');
    $('.button_menu').on("click", "#glow_avoid_bttn", dcrpAvoidGlow);
    $('.button_menu').on("click", "#glow_apprch_bttn", dcrpApprchGlow);
}

function dcrpAvoidGlow() {
    $('#autoload').load('../narratives/warrior_nar.html #glow_avoided');
    $('.button_menu').load('../narratives/warrior_nar.html #avoid_glow_menu');
    $('.button_menu').on("click", "#glow_avoid_cont", toCrossroads);
}

function dcrpApprchGlow() {
    $('#autoload').load('../narratives/warrior_nar.html #glow_approached');
    $('.button_menu').load('../narratives/warrior_nar.html #apprch_glow_menu');
    $('.button_menu').on("click", "#get_frosted", toDefeatPage);
}

// crossroad functions are denoted by direction
function toCrossroads() {
    $('#autoload').load('../narratives/warrior_nar.html #crossroads');
    $('.button_menu').load('../narratives/warrior_nar.html #crossroads_menu');
    $('.button_menu').on("click", "#north_bttn", North);
    $('.button_menu').on("click", "#east_bttn", East);
    $('.button_menu').on("click", "#south_bttn", South);
}

function North() {
    $('#autoload').load('../narratives/warrior_nar.html #north_menu');
    $('.button_menu').load('../narratives/warrior_nar.html #north_menu');
    $('.button_menu').on("click", "#north_return", toCrossroads);
}

function South() {
    $('#autoload').load('../narratives/warrior_nar.html #south_cottage');
    $('.button_menu').load('../narratives/warrior_nar.html #south_menu');
    $('.button_menu').on("click", "#south_return", toCrossroads);
}

function East() {
    $('#autoload').load('../narratives/warrior_nar.html #east_ruins');
    $('.button_menu').load('../narratives/warrior_nar.html #east_menu');
    $('.button_menu').on("click", "#east_cont", toWarrBossPage);
}

// all boss functions are prefixed w/ boss_
function boss_DodgeMeetDemise() {
    $('#bossload').load('../narratives/warrior_nar.html #dodge_meet_demise');
    $('.boss_button_menu').load('../narratives/warrior_nar.html #demise_menu');
    $('.boss_button_menu').on("click", "#demise_cont", toDefeatPage);
}

function boss_DodgeSuccess() {
    $('#bossload').load('../narratives/warrior_nar.html #dodge_success');
    $('.boss_button_menu').load('../narratives/warrior_nar.html #dodge_success_menu');
    $('.boss_button_menu').on("click", "#cntrattk", boss_GetEaten);
    $('.boss_button_menu').on("click", "#ddge_again", boss_DodgeAgain);
}

function boss_GetEaten() {
    $('#bossload').load('../narratives/warrior_nar.html #counter_failed');
    $('.boss_button_menu').load('../narratives/warrior_nar.html #demise_menu');
    $('.boss_button_menu').on("click", "#demise_cont", toDefeatPage);
}

function boss_DodgeAgain() {
    $('#bossload').load('../narratives/warrior_nar.html #dodge_success_2');
    $('.boss_button_menu').load('../narratives/warrior_nar.html #victory');
    $('.boss_button_menu').on("click", "#finished", toVictoryPage);
}

// these are location functions
function toWarrBossPage() { window.location.href = "./warrior_boss.html"; }
function toDefeatPage() { window.location.href = "./defeat.html"; }
function toVictoryPage() { window.location.href = "./victory.html"; }